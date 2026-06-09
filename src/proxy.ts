import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (user === validUser && pwd === validPass) {
      return NextResponse.next();
    }
  }
  
  // Trả về trang lỗi 401 chứa mã JS để tự động đá văng về trang chủ nếu bấm Hủy
  const html = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Đang chuyển hướng...</title>
      <script>
        // Nếu trình duyệt hiển thị nội dung này (nghĩa là user bấm Hủy đăng nhập)
        // Lập tức đá văng về trang chủ
        window.location.href = "/";
      </script>
    </head>
    <body style="background-color: #f4f4f5; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; font-family: sans-serif;">
      <div style="text-align: center;">
        <h2 style="color: #ef4444;">Truy cập bị từ chối!</h2>
        <p style="color: #71717a;">Bạn không có quyền vào khu vực này. Đang đưa bạn về trang chủ...</p>
      </div>
    </body>
    </html>
  `;

  return new NextResponse(html, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}

// Chỉ áp dụng middleware này cho các đường dẫn admin
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
