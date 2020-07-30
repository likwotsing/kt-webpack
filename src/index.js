// import css from '@/styles/css/index.less' // 需要在webpack里配置别名
import '@/styles/css/index.css'
// import '@/styles/css/list.css'
// import '@babel/polyfill'

console.log('home.js'); console.log('cheap')

// css的HMR
// const btn = document.createElement('button')
// btn.innerHTML = '新增'
// document.body.appendChild(btn)

// btn.onclick = function() {
//   const div = document.createElement('div')
//   div.innerHTML = 'item'
//   document.body.appendChild(div)
// }


// import axios from 'axios'

// axios.get('/api/info')
//   .then(res => {
//     console.log(res)
//   })



// console.log('js的热模块替到')
// import counter from './counter'
// import number from './number'

// counter()
// number()

// if (module.hot) {
//   module.hot.accept('./number', function() {
//     document.body.removeChild(document.getElementById('number'))
//     number()
//   })
// }


// babel
// const arr = [new Promise(() => {}), new Promise(() => {})]

// arr.map(item => {
//   console.log(item)
// })

const arr = [1, 2, 3]
const r = arr.includes(3)
console.log(r)


// 支持react语法
import React, { Component } from "react";
import ReactDom from "react-dom";
class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
ReactDom.render(<App />, document.getElementById("app"));