const express = require('express')
const package = require('./package.json');
const watchdocs = require('watchdocs-express')
const app = express()
const bodyParser = require('body-parser');

const swagger = require('./src/swagger')

app.use(watchdocs({
  appId: 'WATCHDOCSIOEXPORTMICROSERVICEcdca2',
  appSecret: 'n31GrXX5fzg32rFLnz3jtHSMzFvSkR8NVP'
}))

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.get('/info', (req, res) => {
  res.json({
    name: package.name,
    description: package.description,
    version: package.version
  })
})

app.post('/export/swagger', swagger)

const server = app.listen('3001', () => {
  console.info('[Watchdocs.io]: Export microservice running on port 3001.')
})

module.exports = {
  app,
  server
};
