class CopyrightWebpackPlugin {
  constructor(options) {
    // 接收参数
    console.log(options)
  }

  // compiler: webpack实例
  apply(compiler) {
    // hooks.emit 在某个时刻触发
    compiler.hooks.emit.tapAsync(
      'CopyrightWebpackPlugin',
      (compilation, cb) => {
        var filelist = 'This is a new txt.\n\n'
        for (var filename in compilation.assets) {
          filelist += '- ' + filename + '\n'
        }

        compilation.assets['copyright.txt'] = {
          source: function() {
            // return filelist
            return 'this is a new txt.'
          },
          size: function() {
            return filelist.length
          }
        }
        cb()
      }
    )

    // 同步的写法
    // compiler.hooks.compile.tap('CopyrightWebpackPlugin', compilation => {
    //   console.log('自定义plugin执行了一些事情')
    // })
  }
}

module.exports = CopyrightWebpackPlugin