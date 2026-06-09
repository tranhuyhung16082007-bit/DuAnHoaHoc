import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { taskId, action, feedback } = body; // action: 'approve' | 'reject' | 'requeue'

    if (!taskId || !action) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    let newStatus = 'rejected';
    if (action === 'approve') newStatus = 'published';
    if (action === 'requeue') newStatus = 'pending';

    const updatePayload: any = { status: newStatus };
    if (action === 'requeue' && feedback) {
      updatePayload.ai_checker_note = feedback;
    }

    const { data: taskData, error: updateError } = await supabaseAdmin
      .from('homework_tasks')
      .update(updatePayload)
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
