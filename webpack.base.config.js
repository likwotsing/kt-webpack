const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: '[name]_[hash:6].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/images/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        include: path.resolve(__dirname, './src'), // 推荐使用
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash:6].[ext]',
            outputPath: 'iconfont/',
            limit: 1024
          }
        }
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './src'), // 推荐使用
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}