import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId, action } = body; // action: 'approve' or 'reject'

    if (!taskId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'published' : 'rejected';

    const { data: taskData, error: updateError } = await supabaseAdmin
      .from('homework_tasks')
      .update({ status: newStatus })
      .eq('task_id', taskId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Nếu duyệt, tự động push sang bảng exercises (Kho Bài Tập chung)
    if (action === 'approve' && taskData) {
      const exerciseId = `ai-${taskData.short_id || Date.now()}`;
      const newExercise = {
        id: exerciseId,
        type: 'TL',
        tags: ['Hỏi Bài AI'],
        de_bai: taskData.extracted_prompt || 'Không có đề bài',
        dap_an_tl: 'Xem chi tiết trong lời giải',
        loi_giai: taskData.ai_solution_markdown || 'Không có lời giải'
      };

      const { error: insertError } = await supabaseAdmin
        .from('exercises')
        .insert([newExercise]);
        
      if (insertError) {
        console.error('Lỗi khi push sang exercises:', insertError);
        // Có thể throw lỗi hoặc log lại tùy vào requirement
      }
    }

    return NextResponse.json({ success: true, task: taskData });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
