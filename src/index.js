// import css from '@/styles/css/index.less' // 需要在webpack里配置别名
import '@/styles/css/index.css'
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

console.log('js的热模块替到')

import axios from 'axios'

axios.get('/api/info')
  .then(res => {
    console.log(res)
  })

import counter from './counter'
import number from './number'

counter()
number()

if (module.hot) {
  module.hot.accept('./number', function() {
    document.body.removeChild(document.getElementById('number'))
    number()
  })
}