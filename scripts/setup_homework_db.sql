-- 1. TẠO BẢNG homework_tasks
CREATE TABLE IF NOT EXISTS public.homework_tasks (
    task_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    short_id VARCHAR(10) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    original_image_url TEXT NOT NULL,
    extracted_prompt TEXT,
    ai_solution_markdown TEXT,
    ai_checker_note TEXT,
    status TEXT DEFAULT 'pending'::text
);

-- 2. TẠO STORAGE BUCKET (Dành cho lưu trữ ảnh)
-- Mở khóa đoạn code dưới đây nếu bạn chưa tạo bucket 'homeworks'
-- insert into storage.buckets (id, name, public)
-- values ('homeworks', 'homeworks', true);

-- 3. CẤU HÌNH BẢO MẬT (RLS - Row Level Security)
-- Cho phép bất kỳ ai (public) có thể insert bài tập mới từ Web
ALTER TABLE public.homework_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to homework_tasks"
    ON public.homework_tasks FOR INSERT 
    WITH CHECK (true);

-- Cho phép public đọc các bài tập (để render lên giao diện web)
CREATE POLICY "Allow public read homework_tasks"
    ON public.homework_tasks FOR SELECT 
    USING (true);

-- Cho phép n8n update thông tin giải bài (Cần dùng service_role key khi gọi API)
CREATE POLICY "Allow service_role to update homework_tasks"
    ON public.homework_tasks FOR UPDATE
    USING (auth.jwt() ->> 'role' = 'service_role');

-- 4. POLICY CHO STORAGE BUCKET 'homeworks'
-- Cho phép upload ảnh công khai (anon)
CREATE POLICY "Allow public upload to homeworks bucket"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'homeworks');

-- Cho phép đọc ảnh công khai
CREATE POLICY "Allow public read from homeworks bucket"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'homeworks');
