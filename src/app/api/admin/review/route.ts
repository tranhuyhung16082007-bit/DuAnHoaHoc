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

    const { data, error } = await supabaseAdmin
      .from('homework_tasks')
      .update({ status: newStatus })
      .eq('task_id', taskId)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, task: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
