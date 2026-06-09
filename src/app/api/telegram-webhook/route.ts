import { NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { editMessageText } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Xử lý khi người dùng nhấn nút (callback_query)
    if (body.callback_query) {
      const callbackQuery = body.callback_query;
      const data = callbackQuery.data; // "APPROVE_uuid" hoặc "REJECT_uuid"
      const messageId = callbackQuery.message.message_id;

      if (!data) return NextResponse.json({ ok: true });

      const parts = data.split('_');
      if (parts.length < 2) return NextResponse.json({ ok: true });

      const action = parts[0];
      const taskId = parts.slice(1).join('_'); // Có thể taskId chứa _ (mặc dù uuid không có)

      // Lấy thông tin bài tập từ bảng homework_tasks
      const { data: taskData, error: taskError } = await supabase
        .from('homework_tasks')
        .select('*')
        .eq('task_id', taskId)
        .single();

      if (taskError || !taskData) {
        console.error('Không tìm thấy task:', taskError);
        await editMessageText(messageId, 'Lỗi: Không tìm thấy bài tập này trong hệ thống.');
        return NextResponse.json({ ok: true });
      }

      if (taskData.status !== 'pending') {
        await editMessageText(messageId, `Bài tập này đã được xử lý trước đó (Trạng thái: ${taskData.status})`);
        return NextResponse.json({ ok: true });
      }

      if (action === 'APPROVE') {
        // 1. Cập nhật trạng thái homework_tasks
        await supabaseAdmin
          .from('homework_tasks')
          .update({ status: 'published' })
          .eq('task_id', taskId);

        // 2. Chèn vào bảng exercises (định dạng TN, DS, hoặc TL tuỳ biến)
        // Vì hệ thống chưa phân loại tự động 100%, tạm thời lưu dưới dạng tự luận (TL) hoặc form chung
        const exerciseId = `ai-${Date.now()}`;
        const newExercise = {
          id: exerciseId,
          type: 'TL', // Mặc định là trả lời tự luận
          tags: ['ai_solved'],
          de_bai: taskData.extracted_prompt || 'Không có đề bài',
          dap_an_tl: 'Xem chi tiết trong lời giải',
          loi_giai: taskData.ai_solution_markdown || 'Không có lời giải'
        };

        const { error: insertError } = await supabaseAdmin
          .from('exercises')
          .insert([newExercise]);

        if (insertError) {
          console.error('Lỗi chèn vào bảng exercises:', insertError);
          await editMessageText(messageId, 'Lỗi khi xuất bản vào bảng bài tập chính!');
        } else {
          await editMessageText(messageId, `✅ Đã duyệt và xuất bản bài tập lên Web!`);
        }

      } else if (action === 'REJECT') {
        // Cập nhật trạng thái homework_tasks
        await supabaseAdmin
          .from('homework_tasks')
          .update({ status: 'rejected' })
          .eq('task_id', taskId);

        await editMessageText(messageId, `❌ Đã hủy bỏ bài tập này.`);
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error) {
    console.error('Lỗi xử lý webhook Telegram:', error);
    return NextResponse.json({ ok: true }); // Luôn trả về 200 cho Telegram để không bị retries
  }
}
