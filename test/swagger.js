const should = require('should')
const request = require('supertest')

const server = require('../')

describe('Swagger Endpoint', () => {

  it('should respond to a POST call', function(done) {
    request(server)
      .post('/export/swagger')
      .expect(400)
      .then(res => {
        done()
      })
  })

})
