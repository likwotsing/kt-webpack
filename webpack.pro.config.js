const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfg = require('./webpack.base.config')
const merge = require('webpack-merge')


const proConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build'),
    // 使用cdn：https://via.placeholder.com/
    publicPath: 'https://via.placeholder.com/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, './src'), // 推荐使用includes
        // exclude: path.resolve(__dirname, './node_modules'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        include: path.resolve(__dirname, './src'), // 推荐使用
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        include: path.resolve(__dirname, './src'),
        use: [
          // {
          //   loader: 'url-loader',
          //   options: {
          //     name: '[name]_[hash:8].[ext]',
          //     limit: 1000,
          //     outputPath: 'images/'
          //   }
          // }
          {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash:8].[ext]',
              outputPath: 'images/',
              limit: 1000
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
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
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      // 容易造成层级问题，在loader里设置publicPath解决
      filename: 'css/[name][chunkhash:8].css'
    }),
    // 压缩css
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      }
    })
  ]
}

module.exports = merge(baseConfg, proConfig)