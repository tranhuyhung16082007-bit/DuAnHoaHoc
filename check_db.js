const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkPendingTasks() {
  const { data, error, count } = await supabase
    .from('homework_tasks')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');
    
  if (error) {
    console.error('Error fetching tasks:', error);
  } else {
    console.log(`FOUND_PENDING_TASKS=${count}`);
  }
}
checkPendingTasks();
