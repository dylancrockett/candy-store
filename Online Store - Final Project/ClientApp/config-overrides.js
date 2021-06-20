module.exports = {
  webpack: (config, env) => {
    config.resolve = {
      extensions: ['.tsx', '.ts', '.js'],
    }

    return config;
  },
}