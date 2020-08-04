const path = require('path')
const CopyrightWebpackPlugin = require('./src/myPlugins/copyright-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  resolveLoader: {
    modules: ['node_modules', './src/myLoaders']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            // loader: path.resolve(__dirname, './src/myLoaders/replaceLoader.js'),
            loader: 'replaceLoader',
            options: {
              name: '我的loader'
            }
          },
          {
            // loader: path.resolve(__dirname, './src/myLoaders/replaceLoaderAsync.js'),
            loader: 'replaceLoaderAsync',
            options: {
              name: '自定义loader'
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              name: 'andy'
            }
          }
        ]
      }
    ]
  },
  plugins: [new CopyrightWebpackPlugin({
    name: '我的plugin'
  })]
}