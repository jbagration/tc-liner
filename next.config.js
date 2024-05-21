const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };

    return config;
  },

  async rewrites() {
    return [
    ];
  },

  async redirects() {
    return [
    ];
  },

  async headers() {
    return [
    ];
  },

  images: {
    domains: ['tclainer.backend.demowts.ru'],
  },
};

module.exports = nextConfig;
