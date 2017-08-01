const { Identity, Maybe } = require('ramda-fantasy')
const { Just, Nothing } = Maybe

const setSwaggerVersion = _ =>
  Object.assign({}, _, { swagger: '2.0' })

const splitUrl = url =>
  url.match(/^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/)

const extractUrlParts = urlParts => ({
  host: urlParts[2],
  basePath: urlParts[3] ? urlParts[3].replace(/\/$/, '') : '',
  schemes: [
    urlParts[1]
  ]
})

const parseUrl = url => _ =>
  Identity(url)
    .map(splitUrl)
    .map(extractUrlParts)
    .map(value => Object.assign({}, _, value))
    .get()
exports.parseUrl = parseUrl

const getProjectInfo = name => _ => (
  Object.assign({}, _, {
    info: {
      title: name,
      description: '',
      version: '1.0.0'
    }
  })
)

const convert = ({ project, paths }) =>
  Identity({})
    .map(setSwaggerVersion)
    .map(parseUrl(project.base_url))
    .map(getProjectInfo(project.name))
    .get()
exports.convert = convert
