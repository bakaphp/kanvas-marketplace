/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['i.redd.it', 'cdn.shopify.com'],
  },
};

export default nextConfig;
