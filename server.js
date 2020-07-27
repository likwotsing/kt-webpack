const express = require('express')

const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'andy',
    age: 20,
    sex: '男'
  })
})

app.listen('9091')
console.log('server is running at http://localhost:9091')