require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const { data } = await supabase.from('homework_tasks').select('*').eq('status', 'pending').limit(1);
  if (!data || data.length === 0) {
    console.log('NO_TASKS');
    return;
  }
  const task = data[0];
  console.log(`TASK_ID=${task.task_id}`);
  console.log(`SHORT_ID=${task.short_id}`);
  console.log(`URL=${task.original_image_url}`);
}
run();
