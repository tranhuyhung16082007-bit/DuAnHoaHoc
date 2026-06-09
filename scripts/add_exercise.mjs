import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Đọc thông số kết nối từ .env.local
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvVar = (name) => {
  const match = envContent.match(new RegExp(`${name}=(.*)`));
  return match ? match[1].trim() : null;
};

const supabase = createClient(
  getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY')
);

// Lấy JSON từ tham số dòng lệnh
const jsonInput = process.argv[2];
if (!jsonInput) {
  console.error("Thiếu dữ liệu bài tập (JSON string)");
  process.exit(1);
}

const exercise = JSON.parse(jsonInput);

async function addExercise() {
  const { data, error } = await supabase
    .from('exercises')
    .insert([exercise]);

  if (error) {
    console.error('Lỗi khi thêm bài tập:', error);
    process.exit(1);
  } else {
    console.log(`Đã thêm thành công bài tập ID: ${exercise.id}`);
  }
}

addExercise();
