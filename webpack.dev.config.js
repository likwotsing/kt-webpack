const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 开启js模块的HMR，需要webpack
const webpack = require('webpack')
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

// 多页面打包通用方案
// const setMPA = () => {
//   const entry = {}
//   const htmlwebpackplugins = []

//   const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))
//   // console.log(entryFiles)

//   entryFiles.map((item, index) => {
//     const entryFile = entryFiles[index]
//     const match = entryFile.match(/src\/(.*)\/index\.js$/)
//     // console.log(match)
//     const pageName = match && match[1]

//     entry[pageName] = entryFile

//     htmlwebpackplugins.push(
//       new HtmlWebpackPlugin({
//         template: path.join(__dirname, `./src/${pageName}/index.html`),
//         filename: `${pageName}.html`,
//         chunks: [pageName]
//       })
//     )
//   })

//   return {
//     entry,
//     htmlwebpackplugins
//   }
// }

// const { entry, htmlwebpackplugins } = setMPA()

module.exports = {
  entry: './src/index.js',
  // entry: {
  //   main: './src/index.js',
  //   list: './src/list.js',
  //   detail: './src/detail.js'
  // },
  // entry,
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // 使用cdn：https://via.placeholder.com/
    // publicPath: 'https://via.placeholder.com/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/images/')
    }
  },
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
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'index.html',
    //   chunks: ['main']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'list.html',
    //   chunks: ['list']
    // }),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'detail.html',
    //   chunks: ['detail', 'list']
    // })
    // ...htmlwebpackplugins
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name][chunkhash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin(),
    // 压缩css
    // new OptimizeCssAssetsPlugin({
    //   cssProcessor: require('cssnano'),
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }],
    //   }
    // })
  ]
}