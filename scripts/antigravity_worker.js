require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (command === 'get_next') {
    const { data } = await supabase.from('homework_tasks').select('*').eq('status', 'pending').order('created_at', { ascending: true }).limit(1);
    if (!data || data.length === 0) {
      console.log('NO_TASKS');
      return;
    }
    const task = data[0];
    console.log(`TASK_ID=${task.task_id}`);
    console.log(`SHORT_ID=${task.short_id}`);
    console.log(`URL=${task.original_image_url}`);
    if (task.ai_checker_note && task.ai_checker_note !== 'ALL_CLEAR') {
      console.log(`\n================================`);
      console.log(`⚠️ ADMIN FEEDBACK (GIẢI LẠI):`);
      console.log(`   ${task.ai_checker_note}`);
      console.log(`================================\n`);
    }

    // Tự động tải ảnh về thư mục scratch để Antigravity xem
    const imgRes = await fetch(task.original_image_url);
    if (imgRes.ok) {
      const buffer = await imgRes.arrayBuffer();
      if (!fs.existsSync('scratch')) fs.mkdirSync('scratch');
      fs.writeFileSync(`scratch/${task.short_id}.png`, Buffer.from(buffer));
      console.log(`IMAGE_DOWNLOADED=scratch/${task.short_id}.png`);
    } else {
      console.log('IMAGE_DOWNLOAD_FAILED');
    }
  } 
  else if (command === 'submit') {
    const shortId = args[1];
    const markdownPath = args[2];
    
    if (!shortId || !markdownPath) {
      console.error('Usage: node antigravity_worker.js submit <short_id> <path_to_markdown>');
      return;
    }

    const solutionContent = fs.readFileSync(markdownPath, 'utf-8');
    
    const { error } = await supabase
      .from('homework_tasks')
      .update({
        ai_solution_markdown: solutionContent,
        status: 'pending_review'
      })
      .eq('short_id', shortId);
      
    if (error) console.error('Error updating task:', error);
    else console.log(`SUCCESS: Task ${shortId} updated to pending_review!`);
  }
}
run();
