// lib/gemini.ts

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY!;

async function callOpenRouter(model: string, messages: any[]) {
  const url = `https://openrouter.ai/api/v1/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
      'HTTP-Referer': 'http://localhost:3000',
      'X-Title': 'HoahocAI'
    },
    body: JSON.stringify({ 
      model: model,
      messages: messages 
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenRouter API Error:', errorText);
    throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  }
  return '';
}

export async function processHomeworkPipeline(imageBase64: string, mimeType: string) {
  // Thay đổi tên model ở đây nếu muốn dùng hãng khác (ví dụ: qwen/qwen-vl-plus hoặc deepseek/deepseek-chat)
  // Tạm thời dùng bản Free mạnh nhất của Google để test xả láng
  const visionModelName = 'nvidia/nemotron-nano-12b-v2-vl:free';
  const solverModelName = 'google/gemma-4-31b-it:free';

  // 1. Vision Agent (Extract text & LaTeX)
  const visionPrompt = `Bạn là trợ lý OCR chuyên nghiệp. Trích xuất đúng chữ, số, công thức trong ảnh, bọc toán/hóa vào $...$ hoặc $$...$$. Không tự ý giải bài.`;
  const visionMessages = [
    {
      role: "user",
      content: [
        { type: "text", text: visionPrompt },
        { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } }
      ]
    }
  ];
  const rawText = await callOpenRouter(visionModelName, visionMessages);

  // 2. Solver Agent (Solve step-by-step in Markdown)
  const solverPrompt = `Bạn là giáo viên chuyên môn cao. Yêu cầu:
1. Giải bài tập step-by-step.
2. Sử dụng định dạng Markdown. Bọc công thức bằng ký hiệu KaTeX ($...$ hoặc $$...$$). Viết sát dấu $ vào công thức (ví dụ: $H_2O$).
3. Không viết tiếng Việt có dấu trong thẻ $$, bắt buộc tách ra ngoài hoặc dùng hàm \\text{}.
4. NHÂN ĐÔI dấu gạch chéo ngược cho escape (ví dụ: \\\\rightarrow, \\\\text{}).
5. Kết luận rõ ràng đáp án cuối cùng.

Đề bài:
${rawText}`;

  const solverMessages = [
    { role: "user", content: solverPrompt }
  ];
  const solvedMarkdown = await callOpenRouter(solverModelName, solverMessages);

  // 3. Critic Agent (Check logic & result)
  const criticPrompt = `Tôi gửi bạn [ĐỀ BÀI] và [LỜI GIẢI]. Hãy kiểm tra xem lời giải có ĐÚNG bản chất khoa học và ĐÚNG KẾT QUẢ không.
QUY TẮC:
1. Nếu lỗi hiển thị LaTeX nhỏ, thiếu ngoặc, lỗi chính tả -> Coi là ĐÚNG. Trả về JSON {"checker_note": "ALL_CLEAR"}.
2. Nếu SAI BẢN CHẤT LOGIC hoặc SAI ĐÁP ÁN -> Trả về JSON chứa cảnh báo ngắn gọn. KHÔNG SỬA BÀI.

Trả kết quả JSON thô, không bọc markdown codeblock.

[ĐỀ BÀI]
${rawText}

[LỜI GIẢI]
${solvedMarkdown}`;

  const criticMessages = [
    { role: "user", content: criticPrompt }
  ];
  
  let checkerNote = 'ALL_CLEAR';
  try {
    const criticRes = await callOpenRouter(solverModelName, criticMessages);
    // Parse JSON safely
    const cleanJsonString = criticRes.replace(/```json/g, '').replace(/```/g, '').trim();
    const criticJson = JSON.parse(cleanJsonString);
    if (criticJson.checker_note) {
      checkerNote = criticJson.checker_note;
    }
  } catch (error) {
    console.error('Lỗi parse kết quả Critic Agent:', error);
  }

  return {
    rawText,
    solvedMarkdown,
    checkerNote
  };
}
