# Hướng Dẫn Cấu Hình n8n & Telegram Bot (Dành cho Admin)

Tài liệu này hướng dẫn bạn cách thiết lập hệ thống Orchestrator (n8n) và Telegram Bot dựa trên các file code đã được xây dựng sẵn.

## 1. Biến môi trường (Environment Variables)
Mở file `.env.local` trong dự án Next.js và thêm dòng sau để kết nối Webhook của n8n:
```env
# Thay bằng URL Webhook thực tế sinh ra từ n8n của bạn
N8N_WEBHOOK_URL="https://n8n.your-domain.com/webhook/homework-solve"
```

## 2. Cấu hình n8n (Giai đoạn 3)

Trong giao diện n8n, bạn hãy tạo một **Workflow mới** với các Node theo thứ tự sau:

### Trạm 1: Webhook (Đầu vào)
- **Node:** Webhook
- **Method:** POST
- **Path:** `homework-solve`
- Dữ liệu nhận được (JSON): `{{ $json.body.task_id }}` và `{{ $json.body.image_url }}`

### Trạm 2: Google Gemini (Vision Agent)
- **Node:** HTTP Request (Hoặc node Google Gemini nếu n8n có sẵn tích hợp)
- **Method:** POST
- **URL:** `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=YOUR_API_KEY`
- **Body JSON:**
```json
{
  "contents": [{
    "parts": [
      {"text": "Bạn là trợ lý OCR chuyên nghiệp. Trích xuất đúng chữ, số, công thức trong ảnh, bọc toán/hóa vào $...$ hoặc $$...$$. Không tự ý giải bài. Trả kết quả JSON thô."},
      {
        "fileData": {
          "mimeType": "image/jpeg",
          "fileUri": "{{ $json.body.image_url }}" 
        }
      }
    ]
  }]
}
```
*Lưu ý: Bạn có thể cần tải ảnh tạm qua HTTP Request để lấy base64 nếu API Gemini yêu cầu thay vì truyền URI trực tiếp.*

### Trạm 3: Google Gemini (Solver Agent)
- **Node:** HTTP Request
- **URL:** Giống trạm 2 (Sử dụng Gemini 1.5 Pro)
- **Body JSON:**
```json
{
  "contents": [{
    "parts": [{
      "text": "Bạn là giáo viên chuyên môn cao. Yêu cầu:\n1. Giải step-by-step.\n2. Định dạng Markdown, bọc KaTeX ($...$). Không viết cách ($ H_2O $ là sai, $H_2O$ là đúng).\n3. Không viết tiếng Việt trong KaTeX (dùng \\text{}).\n4. Yêu cầu NHÂN ĐÔI dấu gạch chéo ngược cho mọi ký tự escape (vd: \\\\rightarrow, \\\\text{}). Kết luận đáp án.\n\nĐề bài:\n{{ $node[\"Vision Agent\"].json.text }}"
    }]
  }]
}
```

### Trạm 4: Google Gemini (Critic Agent)
- **Node:** HTTP Request
- **URL:** Đổi sang model `gemini-1.5-flash` để tối ưu chi phí.
- **Body JSON:** Truyền đề bài gốc và lời giải của Trạm 3 vào prompt kiểm duyệt như đặc tả hệ thống đã ghi.

---

## 3. Cấu hình Telegram Bot (Giai đoạn 4)

### Gửi thông báo đến Admin
- **Node:** Telegram
- **Action:** Send a text message or reply
- **Chat ID:** Nhập ID của bạn (hoặc group của bạn).
- **Text:** 
  Sử dụng biểu thức n8n để kiểm tra `checker_note` từ Trạm 4.
  Ví dụ: `{{ $node["Critic Agent"].json.checker_note === "ALL_CLEAR" ? "🟢 [AN TOÀN]" : "🔴 [CẢNH BÁO]: " + $node["Critic Agent"].json.checker_note }}`
- **Reply Markup:** Chọn `Inline Keyboard`

**Cấu hình JSON cho Inline Keyboard:**
```json
{
  "inline_keyboard": [
    [
      {
        "text": "🟢 Duyệt & Đăng",
        "callback_data": "APPROVE_{{ $node[\"Webhook\"].json.body.task_id }}"
      },
      {
        "text": "🔴 Hủy bỏ",
        "callback_data": "REJECT_{{ $node[\"Webhook\"].json.body.task_id }}"
      }
    ]
  ]
}
```

### Thiết lập Webhook phản hồi từ Telegram
Tạo một **Workflow n8n thứ hai** để xử lý thao tác nhấn nút:
1. **Node:** Telegram Trigger (Bắt sự kiện `Callback Query`).
2. **Node:** Switch/If (Kiểm tra dữ liệu `APPROVE` hay `REJECT`).
3. **Node:** HTTP Request (Gọi Supabase API)
   - Nếu `APPROVE`: Gọi API PATCH tới bảng `homework_tasks` của Supabase để update `status = 'published'`, và `ai_solution_markdown` = nội dung đã giải.
   - Nếu `REJECT`: Gọi API PATCH update `status = 'rejected'`.
4. **Node:** Telegram (Trả lời callback báo "Đã duyệt!" hoặc "Đã hủy" để xóa nút bấm).
