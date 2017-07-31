const should = require('should')
const request = require('supertest')

const server = require('../')

describe('Server Tests', () => {

  it('Server should be running on port 3001', function(done) {
    request(server)
      .get('/info')
      .expect(200)
      .then(res => {
        done()
      })
  })

  it('call to / should return microservice data', function(done) {
    request(server)
      .get('/info')
      .expect(200)
      .then(res => {
        res.body.should.have.property('version').which.is.a.String()
        done()
      })
  })
})
