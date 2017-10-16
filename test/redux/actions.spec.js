const expect = require('chai').expect
const actions = require('../../src/redux/actions')

describe('Action creator', function() {
  describe('vehicles action', () => {
    describe('VEHICLES_LOADED', function() {
      it('should return action', () => {
        const { VEHICLES_LOADED, vehiclesLoaded } = actions

        expect(vehiclesLoaded()).to.deep.equal({ type: VEHICLES_LOADED })
      })
    })

    describe('VEHICLE_LOADED', function() {
      const testSets = []
      before(() => {})
      it('should return action', () => {
        const { VEHICLE_LOADED, vehicleLoaded } = actions
        const testSets = [
          { id: 'tetsId', image: 'testImage', url: 'testUrl' },
          { id: 'xf', image: '/images/xf.png', url: '/vehicles/xf' },
        ]

        testSets.forEach(({ id, image, url }) => {
          expect(vehicleLoaded(id, url, image)).to.deep.equal({
            type: VEHICLE_LOADED,
            id,
            url,
            image,
          })
        })
      })
    })

    describe('error', function() {
      it('should return action', () => {
        const { VEHICLES_ERROR, vehiclesError } = actions
        const message = 'Oops'

        expect(vehiclesError(message)).to.deep.equal({
          type: VEHICLES_ERROR,
          error: message,
        })
      })
    })
  })
  describe('vehicle detail action', () => {
    describe('VEHICLE_DETAIL_LOADED', function() {
      const testSets = []
      before(() => {})
      it('should return action', () => {
        const { VEHICLE_DETAIL_LOADED, vehicleDetailLoaded } = actions
        const testSets = [
          { id: 'tetsId', description: 'testDescription', price: 'testPrice' },
          { id: 'xf', description: 'Nice car.', price: '300$' },
        ]

        testSets.forEach(({ id, description, price }) => {
          expect(vehicleDetailLoaded(id, description, price)).to.deep.equal({
            type: VEHICLE_DETAIL_LOADED,
            id, description, price
          })
        })
      })
    })

    describe('VEHICLE_DETAIL_ERROR', function() {
      it('should return action', () => {
        const { VEHICLE_DETAIL_ERROR, vehicleDetailError } = actions
        const message = 'Oops'
        const id= 'id'

        expect(vehicleDetailError(id, message)).to.deep.equal({
          type: VEHICLE_DETAIL_ERROR,
          error: message,
          id
        })
      })
    })
  })
})
