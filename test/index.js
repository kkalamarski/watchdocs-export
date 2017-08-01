const should = require('should')
const request = require('supertest')

const { app, server } = require('../')

describe('Server Tests', () => {

  it('Server should be running on port 3001', function(done) {
    request(app)
      .get('/info')
      .expect(200)
      .then(res => {
        done()
      })
  })

  it('call to / should return microservice data', function(done) {
    request(app)
      .get('/info')
      .expect(200)
      .then(res => {
        res.body.should.have.property('version').which.is.a.String()
        done()
      })
  })

  describe('Swagger Endpoint', () => {

    it('should respond to a POST call', function(done) {
      request(app)
        .post('/export/swagger')
        .expect(400)
        .then(res => {
          done()
        })
    })
  })
})

after(function(done) {
  server.close(() => done())
})
