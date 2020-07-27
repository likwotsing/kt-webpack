const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const glob = require('glob')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 开启js模块的HMR，需要webpack
const webpack = require('webpack')

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
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, './src')
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
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
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
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name][chunkhash:8].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}