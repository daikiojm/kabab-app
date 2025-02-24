const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Polyfill for crypto module
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "vm": false
    }
  };

  // Disable performance hints
  config.performance = {
    hints: false
  };

  // Vector icons configuration for web
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: [
      require.resolve('react-native-vector-icons'),
    ],
  });

  return config;
};
