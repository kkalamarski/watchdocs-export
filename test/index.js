const should = require('should')
const request = require('supertest')

const { app, server } = require('../')

// mocks
const project = require('./mocks/project.json')
const paths = require('./mocks/paths.json')


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
        .end((err, res) => {
          res.status.should.equal(400)
          done()
        })
    })

    it('should respond with status 200 to valid call', function(done) {
      const body = { project, paths }

      request(app)
        .post('/export/swagger')
        .send(body)
        .expect(200)
        .then(res => {
          done()
        })
    })
  })
})

after(function(done) {
  server.close(() => done())
})
