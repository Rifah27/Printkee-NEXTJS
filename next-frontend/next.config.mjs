const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5030',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
