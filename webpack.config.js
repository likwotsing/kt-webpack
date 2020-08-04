const path = require('path')

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
      }
    ]
  }
}