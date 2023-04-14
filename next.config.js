/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true, // FIXME
  },
  typescript: {
    ignoreBuildErrors: true, // FIXME
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
