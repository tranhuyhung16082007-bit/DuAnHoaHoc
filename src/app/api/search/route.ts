import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const trimmedQuery = query.trim();

  // 1. Kiểm tra xem query có giống mã ID Hỏi Bài (5 ký tự) không
  if (trimmedQuery.length === 5 && /^[A-Z0-9]+$/i.test(trimmedQuery)) {
    const { data: taskData, error: taskError } = await supabase
      .from('homework_tasks')
      .select('*')
      .eq('short_id', trimmedQuery.toUpperCase())
      .maybeSingle(); // Dùng maybeSingle để không văng lỗi nếu không tìm thấy
      
    if (taskData) {
      // Map về định dạng Exercise
      const mappedExercise = {
        id: `ai-${taskData.short_id}`,
        type: 'TL',
        tags: ['Từ Kho Hỏi Bài AI', taskData.status === 'pending' ? 'Đang giải' : 'Đã có lời giải'],
        de_bai: taskData.extracted_prompt || '*Hệ thống đang trích xuất đề bài từ ảnh của bạn...*',
        loi_giai: taskData.ai_solution_markdown || '*AI đang suy nghĩ và giải bài. Vui lòng quay lại kiểm tra sau 1-2 phút nhé!*'
      };
      return NextResponse.json([mappedExercise]);
    }
  }

  // 2. Chuyển đổi query thành dạng phù hợp cho Full Text Search
  // Ví dụ: "đốt cháy este" -> "đốt & cháy & este"
  const formattedQuery = trimmedQuery
    .trim()
    .split(/\s+/)
    .map(word => `${word}:*`) // Thêm :* để search theo dạng prefix
    .join(' & ');

  try {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .textSearch('fts', formattedQuery, {
        config: 'simple',
        type: 'phrase' // Sử dụng phrase để khớp chính xác hơn
      })
      .limit(20); // Giới hạn 20 kết quả

    if (error) {
      console.error('Supabase search error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Search API error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
