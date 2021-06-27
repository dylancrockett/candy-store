module.exports = {
  webpack: (config, env) => {
    config.resolve = {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    }

    return config;
  },
}