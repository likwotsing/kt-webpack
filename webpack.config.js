const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './src/index.js',
  entry: {
    main: './src/index.js',
    list: './src/list.js',
    detail: './src/detail.js'
  },
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'iconfont/',
            limit: 1024
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'list.html',
      chunks: ['list']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'detail.html',
      chunks: ['detail', 'list']
    })
  ]
}