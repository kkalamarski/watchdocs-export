const express = require('express')
const package = require('./package.json');
const watchdocs = require('watchdocs-express')
const app = express()

const swagger = require('./src/swagger')

app.use(watchdocs({
  appId: 'WATCHDOCSIOEXPORTMICROSERVICEcdca2',
  appSecret: 'n31GrXX5fzg32rFLnz3jtHSMzFvSkR8NVP'
}))

app.get('/info', (req, res) => {
  res.json({
    name: package.name,
    description: package.description,
    version: package.version
  })
})

app.post('/export/swagger', swagger)

app.listen('3001', () => {
  console.info('[Watchdocs.io]: Export microservice running on port 3001.')
})

module.exports = app;
