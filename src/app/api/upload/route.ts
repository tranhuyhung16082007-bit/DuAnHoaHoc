import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { processHomeworkPipeline } from '@/lib/gemini';
import { sendReviewMessage } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // 1. Upload ảnh lên Supabase Storage
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('homeworks')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (storageError) {
      console.error('Lỗi upload ảnh:', storageError);
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage
      .from('homeworks')
      .getPublicUrl(fileName);
      
    const imageUrl = publicUrlData.publicUrl;

    // 2. Tạo bản ghi trong homework_tasks với short_id
    // Tạo chuỗi 5 ký tự ngẫu nhiên (chữ và số)
    const shortId = Math.random().toString(36).substring(2, 7).toUpperCase();
    
    const { data: taskData, error: dbError } = await supabase
      .from('homework_tasks')
      .insert([
        { 
          original_image_url: imageUrl, 
          status: 'pending',
          short_id: shortId
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Lỗi lưu DB:', dbError);
      return NextResponse.json({ error: 'Failed to save task' }, { status: 500 });
    }

    // 3. Xử lý AI ngầm và bắn Telegram
    // Chạy bất đồng bộ không block response để user không phải đợi lâu
    (async () => {
      try {
        // Đọc file thành base64 cho Gemini
        const buffer = await file.arrayBuffer();
        const base64Data = Buffer.from(buffer).toString('base64');
        const mimeType = file.type || 'image/jpeg';
        
        // Chạy qua 3 trạm AI
        const aiResult = await processHomeworkPipeline(base64Data, mimeType);

        // Update DB với kết quả giải
        await supabase
          .from('homework_tasks')
          .update({
            extracted_prompt: aiResult.rawText,
            ai_solution_markdown: aiResult.solvedMarkdown,
            ai_checker_note: aiResult.checkerNote
          })
          .eq('task_id', taskData.task_id);

        // Tạo đường link xem trước dựa trên host của request hiện tại
        const protocol = request.headers.get('x-forwarded-proto') || (request.headers.get('host')?.includes('localhost') ? 'http' : 'https');
        const host = request.headers.get('host');
        const previewUrl = `${protocol}://${host}/preview/${taskData.task_id}`;

        // Gửi Telegram cho Admin duyệt kèm theo link xem trước
        await sendReviewMessage(
          taskData.task_id, 
          aiResult.checkerNote, 
          previewUrl
        );

      } catch (pipelineError) {
        console.error('Lỗi chạy dây chuyền AI:', pipelineError);
      }
    })();

    return NextResponse.json({ 
      success: true, 
      task_id: taskData.task_id,
      short_id: taskData.short_id,
      image_url: imageUrl
    });

  } catch (error) {
    console.error('Lỗi server:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
