const expect = require('chai').expect
const sinon = require('sinon')

const thunk = require('../../src/redux/thunk')
const actions = require('../../src/redux/actions')
const server = require('../../server')

describe('Thunk of', () => {
  let app
  before(() => {
    app =server.listen(9988)
  })
  after(() => {
    app.close()
  })

  describe('load vehicles', () => {
    it('should dispatch VEHICLE_LOADED for all vehicles', done => {
      const { VEHICLE_LOADED } = actions
      const dispatch = sinon.spy()
      thunk.loadVehicles()(dispatch).then(d => {
        const expected = d.vehicles.map(v => {
          const { id, url, media } = v
          const image = media.find(m => m.name === 'vehicle').url
          return { id, url, image, type: VEHICLE_LOADED }
        })
        expect(Array.isArray(d.vehicles)).to.equal(true)
        expect(dispatch.called).to.equal(true)
        expect(dispatch.callCount).to.equal(6)
        dispatch.args.filter(a => a[0].type === VEHICLE_LOADED).forEach(arg => {
          const current = arg[0]
          const currentExpected = expected.find(e => e.id === current.id)
          expect(current).to.deep.equal(currentExpected)
        })
        done()
      })
    })
    it('should dispatch VEHIDLES_LOADED after finished', done => {
      const { VEHICLES_LOADED } = actions
      const dispatch = sinon.spy()
      thunk.loadVehicles()(dispatch).then(d => {
        expect(Array.isArray(d.vehicles)).to.equal(true)
        expect(dispatch.called).to.equal(true)
        expect(dispatch.callCount).to.equal(6)
        expect(dispatch.args.filter(a => a[0].type === VEHICLES_LOADED).length).to.equal(1)
        done()
      })
    })
  })
  describe('load vehicle details', () => {
    it('should dispatch LOAD_DETAILS for reqester vehicle', done => {
      const { VEHICLE_DETAIL_LOADED } = actions
      const dispatch = sinon.spy()
      const id = 'ftype'
      thunk.loadVehicleDetail(id, `/api/vehicle/${id}`)(dispatch).then(d => {
        expect(dispatch.called).to.equal(true)
        expect(dispatch.callCount).to.equal(1)
        const args = dispatch.args[0][0]
        expect(args).to.deep.equal({
          type: VEHICLE_DETAIL_LOADED, id, description: 'Pulse-quickening, pure Jaguar sports car.', price: '£60,000'
        })
        done()
      })
      
    })
  })
})