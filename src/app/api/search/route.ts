import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  // Chuyển đổi query thành dạng phù hợp cho Full Text Search
  // Ví dụ: "đốt cháy este" -> "đốt & cháy & este"
  const formattedQuery = query
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
