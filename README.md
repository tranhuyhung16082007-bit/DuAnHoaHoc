# 🧪 Hóa Học THPTQG Survival Guide

Một nền tảng học tập tối giản, hiện đại và tính hệ thống cao, được thiết kế đặc biệt để giúp học sinh THPTQG "sống sót" và chinh phục môn Hóa Học (và mở rộng ra các môn khác trong tương lai).

Khác biệt cốt lõi: Không chỉ là nơi lưu trữ tài liệu khô khan, nền tảng này hệ thống hóa kiến thức thành các **"Dạng bài" (Problem Types)**, cung cấp thuật toán tư duy (Step-by-step algorithms) và rèn luyện qua các bài tập vận dụng có chủ đích.

---

## 🎯 1. Mục tiêu dự án
*   **Hệ thống hóa:** Chia nhỏ kiến thức môn Hóa học THPT thành các dạng bài cụ thể, có dấu hiệu nhận biết rõ ràng.
*   **Thực chiến:** Cung cấp hướng dẫn giải theo từng bước (Step-by-step), không lý thuyết sáo rỗng.
*   **Luyện tập:** Tích hợp bài tập liên quan trực tiếp đến dạng bài đang học kèm lời giải chi tiết.
*   **Tối giản & Tập trung:** Trải nghiệm UX mượt mà, không quảng cáo, không sao nhãng.

---

## 🛠 2. Tech Stack (Công nghệ sử dụng)
*   **Framework:** [Next.js](https://nextjs.org/) (App Router) - Ưu tiên tốc độ load trang, SEO, và SSG (Static Site Generation).
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Xây dựng giao diện CSS nhanh, tối giản, hỗ trợ Dark Mode dễ dàng.
*   **Content Management:** MDX (Markdown for JSX) - Nội dung các dạng bài, thuật toán được viết bằng file tính (.mdx).
*   **Math/Chem Rendering:** [KaTeX](https://katex.org/) - Render công thức Hóa học.
*   **Deployment:** Vercel.
*   **State Management:** LocalStorage để lưu tiến độ.

---

## 🎨 3. Quy tắc UI/UX
*   **Phong cách (Vibe):** Minimalist (Tối giản), Không gian trắng (White space) rộng rãi, Sạch sẽ.
*   **Màu sắc:** Phân loại rõ ràng theo ngữ cảnh (Chú ý - Vàng, Bẫy - Đỏ, Tips - Xanh lá). Hỗ trợ Dark Mode/Light Mode.
*   **Cấu trúc trang bài học:** Tên dạng bài -> Dấu hiệu nhận biết -> Quy trình giải -> Ví dụ Case Study -> Cảnh báo Bẫy -> Bài tập tương tự.

---

## 📂 4. Cấu trúc thư mục (Folder Structure)

```text
/root
├── /src/app              # Next.js App Router (Routing, Layouts, Pages)
│   ├── /hoc              # Các trang học tập
│   ├── /bang-tuan-hoan   # Tính năng bảng tuần hoàn
├── /content              # Nơi chứa các file nội dung (.mdx, tĩnh)
│   ├── /hoa-12
│   └── /hoa-11
├── /src/components       # UI Components
│   └── ...
└── /public               # Ảnh minh họa, tài nguyên tĩnh
```

---

## 🚀 5. Lộ trình triển khai (Roadmap)

### 🟢 Phase 1: Nền tảng (Foundation) & Giao diện cốt lõi (Đã Hoàn Thành)
*   [x] Khởi tạo dự án Next.js + Tailwind CSS + TypeScript.
*   [x] Cấu hình giao diện, Typography cơ bản.
*   [x] Tích hợp bộ xử lý MDX và KaTeX (CSS) cơ bản để trang render ban đầu.

### 🟡 Phase 2: Engine Nội dung & Dữ liệu động
*   [ ] Thiết lập Dynamic Router để biên dịch tự động các file MDX (có KaTeX) từ thư mục `/content/`.
*   [ ] Custom Component MDX: `<TipBox>`, `<WarningBox>`, `<StepList>`, `<HiddenAnswer>`.
*   [ ] Viết nháp 3 dạng bài Este để thử nghiệm.

### 🟠 Phase 3: Tính năng "Đinh" - Bảng Tuần Hoàn Tương Tác
*   [ ] Hiển thị 118 nguyên tố hóa học dạng Grid.
*   [ ] Tương tác chuột và liên kết môn học.

### 🟣 Phase 4: Tính năng Quản trị
*   [ ] Thanh Search tìm bài tập dạng Fuzzy.
*   [ ] Lưu trữ tiến độ bài học qua LocalStorage.

---

## 🚀 Lộ trình Nâng cấp Hệ thống (Scalability Roadmap)

Để giải quyết vấn đề phình to dữ liệu (Data Bloat) và tối ưu hiệu suất khi số lượng bài tập lên tới hàng nghìn câu, hệ thống sẽ chuyển đổi từ lưu trữ JSON tĩnh sang **Supabase (Cơ sở dữ liệu đám mây)**.

### 1. Mục tiêu
*   **Tốc độ:** Trang web không còn phải tải toàn bộ file bài tập về máy người dùng.
*   **Dung lượng:** Giảm kích thước mã nguồn (Repository) đáng kể.
*   **Tìm kiếm:** Sử dụng Full-Text Search chuyên nghiệp thay vì search thủ công bằng mã JavaScript.

### 2. Các bước thực hiện chi tiết

#### Bước 1: Khởi tạo Cơ sở dữ liệu (Supabase)
*   **Tạo Project:** Đăng ký tài khoản tại [supabase.com](https://supabase.com) và tạo một dự án mới.
*   **Cấu hình bảng:** Tạo bảng `exercises` với các trường dữ liệu tương ứng (ID, Đề bài, Đáp án, Lời giải,...).
*   **Full-Text Search:** Cấu hình cột `tsvector` để tìm kiếm thông minh (ưu tiên số và từ khóa quan trọng).

#### Bước 2: Kết nối & Bảo mật (`.env`)
*   Sử dụng biến môi trường để lưu trữ API Keys an toàn.
*   Cài đặt thư viện `@supabase/supabase-js`.

#### Bước 3: Di chuyển dữ liệu (Migration)
*   Viết script tự động đọc file `content/exercises/exercises.json` hiện tại và đẩy toàn bộ lên database chỉ bằng một câu lệnh.

#### Bước 4: Xây dựng Search API
*   Thay vì search trực tiếp trên Frontend, chúng ta sẽ tạo một Endpoint (API) tại `/api/search` để xử lý các truy vấn tìm kiếm phức tạp một cách nhanh chóng.

#### Bước 5: Cập nhật giao diện
*   Chuyển đổi trang **Kho bài tập** sang chế độ "Lazy Loading" (chỉ tải kết quả khi người dùng tìm kiếm).

---
> [!NOTE]
> Kế hoạch này giúp trang web có thể chứa hàng chục nghìn bài tập mà vẫn giữ được tốc độ tải trang dưới 1 giây.
