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
  
  // Webpack configuration for handling server-side modules
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      // Exclude Google Cloud modules from client-side bundle
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        buffer: require.resolve('buffer'),
      };

      // Exclude Google Cloud libraries from client bundle
      config.externals = config.externals || [];
      config.externals.push({
        '@google-cloud/translate': 'commonjs @google-cloud/translate',
      });
    }

    return config;
  },
  
  // Server external packages for better build performance
  serverExternalPackages: ['@google-cloud/translate'],
};

export default nextConfig;
