/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'picsum.photos' }
    ]
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
