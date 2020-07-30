const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 开启js模块的HMR，需要webpack
const webpack = require('webpack')
const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')


const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 9090,
    contentBase: path.join(__dirname, 'public'),
    proxy: {
      '/api': {
        target: 'http://localhost:9091'
      }
    },
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'), // 推荐使用includes
        // exclude: path.resolve(__dirname, './node_modules'),
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
        include: path.resolve(__dirname, './src'), // 推荐使用
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              limit: 1000,
              outputPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

module.exports = merge(baseConfig, devConfig)