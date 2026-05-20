import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      // 구 URL → 신 URL 301 영구 리다이렉트
      { source: '/cosmetic', destination: '/digital-prosthesis', permanent: true },
      { source: '/orthodontics', destination: '/orthodontic', permanent: true },
    ]
  },
}

export default nextConfig
