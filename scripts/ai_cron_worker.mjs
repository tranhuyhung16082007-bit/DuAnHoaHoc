import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const action = process.argv[2];

async function main() {
  if (action === 'fetch-pending') {
    const { data, error } = await supabase
      .from('homework_tasks')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

    if (error) {
      console.error(JSON.stringify({ error: error.message }));
      process.exit(1);
    }

    console.log(JSON.stringify(data, null, 2));
  } else if (action === 'update-task') {
    const taskId = process.argv[3];
    const solutionMarkdown = process.argv[4];
    const checkerNote = process.argv[5] || 'ALL_CLEAR';

    if (!taskId || !solutionMarkdown) {
      console.error("Usage: node ai_cron_worker.mjs update-task <taskId> '<markdown>' '[checker_note]'");
      process.exit(1);
    }

    const { data, error } = await supabase
      .from('homework_tasks')
      .update({
        ai_solution_markdown: solutionMarkdown,
        ai_checker_note: checkerNote,
        status: 'pending_review'
      })
      .eq('task_id', taskId);

    if (error) {
      console.error(JSON.stringify({ error: error.message }));
      process.exit(1);
    }

    console.log(JSON.stringify({ success: true, taskId }));
  } else {
    console.error("Invalid action. Use 'fetch-pending' or 'update-task'.");
    process.exit(1);
  }
}

main();
