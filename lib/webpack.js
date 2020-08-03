const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAst } = require('@babel/core')

module.exports = class Webpack {
  constructor(options) {
    // console.log(options)
    const { entry, output } = options
    this.entry = entry
    this.output = output
    this.modules = []
  }
  run() {
    // 启动函数
    const info = this.parse(this.entry)
    this.modules.push(info)
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i]
      const { yilai } = item
      if (yilai) {
        for (let j in yilai) {
          this.modules.push(this.parse(yilai[j]))
        }
      }
    }
    // console.log(this.modules);

    // 数组结构转换成require需要的
    const obj = {}
    this.modules.forEach(item => {
      obj[item.entryFile] = {
        yilai: item.yilai,
        code: item.code
      }
    })
    this.file(obj)
  }
  parse(entryFile) {
    // 读取入口文件的内容
    const content = fs.readFileSync(entryFile, 'utf-8')
    // 分析内容，得到AST
    const ast = parser.parse(content, {
      sourceType: 'module'
    })
    // console.log(ast.program.body)

    const yilai = {}
    traverse(ast, {
      ImportDeclaration({ node }) {
        // console.log(node)
        // 拿到模块依赖在项目中的路径
        // ./a.js
        // ./src/index.js
        // console.log(path.dirname(entryFile))
        const newPath = './' + path.join(path.dirname(entryFile), node.source.value)
        yilai[node.source.value] = newPath
      }
    })

    // console.log(yilai)

    // 处理内容，转换代码
    const { code } = transformFromAst(ast, null, {
      // 处理成什么标准的代码
      presets: ['@babel/preset-env']
    })
    // console.log(code);

    return {
      entryFile,
      yilai,
      code
    }
  }
  file(code) {
    const filePath = path.join(this.output.path, this.output.filename)
    const newCode = JSON.stringify(code)
    const bundle = `(function(graph) {
      function require(module) {
        function localRequire(relativePath) {
          return require(graph[module].yilai[relativePath])
        }
        var exports = {};
        (function(require, exports, code) {
          eval(code)
        })(localRequire, exports, graph[module].code)

        return exports;
      }
      require('${this.entry}')
    })(${newCode})`

    fs.writeFileSync(filePath, bundle, 'utf-8')
  }
}