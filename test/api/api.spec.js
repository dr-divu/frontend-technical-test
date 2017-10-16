const expect = require('chai').expect
const api = require('../../src/api')
const server = require('../../server')

const { getVehicle, getVehicles } = api

describe("Vehicle API's", function() {
  let app
  before(() => {
    app = server.listen(9988)
  })

  after(() => {
    app.close()
  })

  describe('vehicle list', function() {
    it('should respond with an array of vehicles', done => {
      getVehicles().then(data => {
        expect(Array.isArray(data.vehicles)).to.equal(true)
        done()
      })
    })

    it('should respond with vehicles with required data', done => {
      getVehicles().then(data => {
        data.vehicles.forEach(d => {
          expect(d).to.have.to.have.property('id').that.is.a('string')
          expect(d).to.have.to.have.property('url').that.is.a('string')
          expect(Array.isArray(d.media)).to.equal(true)
          expect(d).to.have.to.have.property('media').that.is.an('array')
          expect(d.media.some(m => m.hasOwnProperty('name') && m.name === 'vehicle')).to.equal(true)
        })
        done()
      })
    })
  })

  describe('vehicle by id', function() {
    let vehicles
    before(done => {
      getVehicles().then(data => {
        vehicles = data.vehicles
        done()
      })
    })

    it('should respond with with a vehicle', done => {
      Promise.all(vehicles.map(v => getVehicle(v.url)))
      .then(data => {
        data.forEach(v => {
          expect(v).to.have.property('id').that.is.a('string')
          expect(v).to.have.property('price').that.is.a('string')
          expect(v).to.have.property('description').that.is.a('string')
        })
        done()
      })
    })
  })
})
