/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false, // Ẩn logo N (trạng thái build tĩnh/động)
    buildActivity: false, // Ẩn biểu tượng đang load
  },
};

export default nextConfig;
