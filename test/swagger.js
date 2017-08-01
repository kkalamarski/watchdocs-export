const should = require('should')
const request = require('supertest')

const { convert, parseUrl } = require('../src/swagger/parser')

// mocks
const project = require('./mocks/project.json')
const paths = require('./mocks/paths.json')

describe('Swagger parser', () => {

  describe('#convert()', () => {
    let output;

    beforeEach(() => {
      output = convert({ project, paths })
    })

    it('should be a function', () => {
      convert.should.be.a.Function()
    })

    it('should return valid swagger spec object', () => {
      output.should.have.property('swagger').which.is.a.String()
      output.should.have.property('info').which.is.an.Object()
      output.should.have.property('host').which.is.a.String()
      output.should.have.property('basePath').which.is.a.String()
      output.should.have.property('schemes').which.is.an.Array()
      // output.should.have.property('consumes').which.is.an.Array()
      // output.should.have.property('produces').which.is.an.Array()
      // output.should.have.property('paths').which.is.an.Object()
    })

    it('should have swagger property set to 2.0', () => {
      output.swagger.should.equal('2.0')
    })

    it('should correctly parse url', () => {
      output.host.should.equal('api.watchdocs.io')
      output.basePath.should.equal('/api/v1')
      output.schemes.should.containEql('http')
    })
  })

  describe('#parseUrl()', () => {
    let result

    beforeEach(() => {
      result = parseUrl('http://example.com/api/v1/')({})
    })

    it('should return an object', () => {
      result.should.be.an.Object()
    })

    it('should return host, basePath and protocols', () => {
      result.should.have.property('host').which.is.a.String()
      result.should.have.property('basePath').which.is.a.String()
      result.should.have.property('schemes').which.is.an.Array()
    })

    it('should have host porperty containing correct value', () => {
      const { host } = result

      host.should.equal('example.com')
    })

    it('should have basePath porperty containing correct value', () => {
      const { basePath } = result

      basePath.should.equal('/api/v1')
    })

    it('should contain an array with protocol', () => {
      const { schemes } = result

      schemes.should.containEql('http')
    })
  })
})
