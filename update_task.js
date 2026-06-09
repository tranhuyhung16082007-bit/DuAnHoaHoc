require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const rawText = `Hòa tan hoàn toàn 1,93 gam hỗn hợp 2 kim loại Fe và Al vào dd HCl dư, sau phản ứng thu được m gam muối và 1,456 lít khí $H_2$ ở đktc. Giá trị của m là:
A. 6,545 gam
B. 5,46 gam
C. 4,565 gam
D. 2,456 gam`;

const solvedMarkdown = `**Bước 1: Tính số mol khí $H_2$ sinh ra**
Ta có thể tích khí $H_2$ ở đktc là 1,456 lít.
Số mol khí $H_2$ là:
$$ n_{H_2} = \\frac{1,456}{22,4} = 0,065 \\text{ (mol)} $$

**Bước 2: Sử dụng phương pháp bảo toàn khối lượng hoặc tính nhanh khối lượng muối**
Khi kim loại tác dụng với dung dịch $HCl$, toàn bộ gốc $Cl^-$ trong $HCl$ sẽ tạo muối với kim loại. Đồng thời, mỗi phân tử $H_2$ thoát ra tương ứng với 2 ion $H^+$ nhận electron, tức là cần 2 phân tử $HCl$.
Do đó, số mol gốc clorua ($Cl^-$) tạo muối luôn gấp đôi số mol $H_2$:
$$ n_{Cl^-} = 2 \\times n_{H_2} = 2 \\times 0,065 = 0,13 \\text{ (mol)} $$

Khối lượng của ion $Cl^-$ trong muối là:
$$ m_{Cl^-} = 0,13 \\times 35,5 = 4,615 \\text{ (gam)} $$

**Bước 3: Tính khối lượng muối thu được**
Khối lượng muối bằng tổng khối lượng kim loại ban đầu và khối lượng ion $Cl^-$:
$$ m_{\\text{muối}} = m_{\\text{kim loại}} + m_{Cl^-} $$
$$ m_{\\text{muối}} = 1,93 + 4,615 = 6,545 \\text{ (gam)} $$

**Kết luận:** Giá trị của m là **6,545 gam**.
Đáp án đúng là **A**.`;

async function update() {
  const { error } = await supabase
    .from('homework_tasks')
    .update({
      extracted_prompt: rawText,
      ai_solution_markdown: solvedMarkdown,
      status: 'pending_review'
    })
    .eq('short_id', 'IR07X');
  if (error) console.error('Error:', error);
  else console.log('Successfully updated task IR07X');
}
update();
