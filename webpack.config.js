const createExpoWebpackConfigAsync = require('@expo/webpack-config')

module.exports = async function (env, argv) {
  // Configure environment for GitHub Pages
  env = {
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@rneui/base', '@rneui/themed'],
    },
    mode: 'production',
    platform: 'web',
    web: {
      publicPath: '/kabab-app/',
      bundler: 'webpack',
    },
  }

  // Add homepage for GitHub Pages
  // env.homepage = '/kabab-app'

  const config = await createExpoWebpackConfigAsync(env, argv)

  // Set base path for all assets
  config.output = {
    ...config.output,
    // publicPath: '/kabab-app/',
  }

  // Configure HTML webpack plugin
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  const CopyWebpackPlugin = require('copy-webpack-plugin')
  const path = require('path')

  // Copy 404.html from src/web to web-build
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/web/404.html'),
          to: path.resolve(__dirname, 'web-build/404.html'),
        },
      ],
    })
  )

  // Add a custom plugin to modify HTML content
  class AssetPathModifierPlugin {
    apply(compiler) {
      compiler.hooks.compilation.tap('AssetPathModifierPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
          'AssetPathModifierPlugin',
          (data, cb) => {
            // Replace all asset paths with the correct base path
            data.html = data.html.replace(/(href|src)="\/(?!kabab-app\/)/g, '$1="/kabab-app/')
            cb(null, data)
          }
        )
      })
    }
  }

  // config.plugins.push(new AssetPathModifierPlugin())

  // Polyfill for crypto module
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve?.fallback,
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      vm: false,
    },
  }

  // Disable performance hints
  config.performance = {
    hints: false,
  }

  // Vector icons configuration for web
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'file-loader',
    include: [require.resolve('react-native-vector-icons')],
  })

  return config
}
