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

async function checkExercises() {
  console.log("Fetching last 5 exercises...");
  const { data, error } = await supabase
    .from('exercises')
    .select('*')
    .order('id', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching exercises:', error);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}

checkExercises();
