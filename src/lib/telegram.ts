// lib/telegram.ts

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID!;

// Hàm dọn dẹp các ký hiệu Toán/Hóa (LaTeX) rườm rà để đọc cho sướng mắt trên Telegram
export async function sendReviewMessage(taskId: string, checkerNote: string, previewUrl: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const status = checkerNote === 'ALL_CLEAR' 
    ? `🟢 <b>[AI ĐÁNH GIÁ: AN TOÀN]</b>` 
    : `🔴 <b>[⚠️ CẢNH BÁO TỪ AI CHECKER]</b>\nChi tiết: ${checkerNote}`;

  const text = `${status}\n\nĐã có lời giải mới từ AI. Để xem trước lời giải với định dạng chuẩn Toán/Hóa cực đẹp, vui lòng copy link dưới đây dán vào trình duyệt:\n\n👉 ${previewUrl}\n\n<i>(Xem xong hãy quay lại đây để chọn Duyệt hoặc Hủy nhé!)</i>`;

  const inlineKeyboard = {
    inline_keyboard: [
      [
        { text: "🟢 Duyệt & Đăng", callback_data: `APPROVE_${taskId}` },
        { text: "🔴 Hủy bỏ", callback_data: `REJECT_${taskId}` }
      ]
    ]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text: text,
      parse_mode: 'HTML',
      reply_markup: inlineKeyboard
    })
  });

  if (!response.ok) {
    console.error('Lỗi gửi tin nhắn Telegram:', await response.text());
  }
}

export async function editMessageText(messageId: number, text: string) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/editMessageText`;
  
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      message_id: messageId,
      text: text
    })
  });
}
