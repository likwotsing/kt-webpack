const loaderUtils = require('loader-utils')

module.exports = function(source) {
  // console.log(source)
  // console.log(this.query)

  // webpack5以上，推荐使用loader-utils
  const options = loaderUtils.getOptions(this)
  // console.log(options)

  // 同步使用callback返回
  // const result = source.replace('webpack', options.name)
  // this.callback(null, result)

  // 异步使用async函数
  const callback = this.async()
  setTimeout(() => {
    const result = source.replace('webpack', options.name)
    callback(null, result)
  }, 2000)
}