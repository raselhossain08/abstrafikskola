import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // i18n configuration removed - using dynamic backend-driven translation instead
  
  // Image configuration for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
    domains: ['localhost'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Development optimizations - removed deprecated options
  
  // Suppress hydration warnings in development (for browser extension issues)
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config: any) => {
      config.resolve.fallback = { fs: false };
      return config;
    },
  }),
  
  // Server external packages for better build performance
  serverExternalPackages: [],
};

export default nextConfig;
