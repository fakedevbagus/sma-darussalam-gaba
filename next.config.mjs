/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
  },
  // Keamanan: headers dasar (CSP disusun selektif agar embed YouTube/Maps tetap jalan)
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          {
            key: "Content-Security-Policy",
            value: "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://maps.google.com https://www.google.com; frame-ancestors 'self'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
  // Backward-compatible aliases dari struktur menu Darussalam Mimo
  async redirects() {
    return [
      { source: '/tentang', destination: '/profil', permanent: true },
      { source: '/tentang/:path*', destination: '/profil/:path*', permanent: true },
      { source: '/akademik', destination: '/program', permanent: true },
      { source: '/akademik/:path*', destination: '/program/:path*', permanent: true },
      { source: '/berita/:category(pengumuman)', destination: '/pengumuman', permanent: false },
    ];
  }
};
export default nextConfig;
