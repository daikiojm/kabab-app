const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
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
