const loaderUtils = require('loader-utils')
// 把less语法转成css
const less = require('less')

module.exports = function(source) {
  const options = loaderUtils.getOptions(this)
  // console.log(options)
  less.render(source, options, (e, output) => {
    this.callback(e, output.css)
  })
}