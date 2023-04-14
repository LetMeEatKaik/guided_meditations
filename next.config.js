/** @type {import(const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/',
          outputPath: 'static/',
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
'next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
