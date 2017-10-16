const expect = require('chai').expect
const actions = require('../../src/redux/actions')
const reduxState = require('../../src/redux')

const vehicles = [
  { id: '1', url: 'api/1', image: 'img.jpg' },
  { id: '2', url: 'api/2', image: 'img.png' },
]

const vehicleDetails = [
  { id: '1', description: 'A green car.', price: '400$' },
  { id: '2', description: 'A yellow car.', price: '5000$' },]

describe("Vehicle reducer's", () => {
  describe('inititial state', () => {
    let reducer = null

    beforeEach(() => {
      reducer = reduxState.default
    })
    it('should be empty', () => {
      expect(reducer(undefined, { type: '' })).to.deep.equal(
        reduxState.initialState,
      )
    })
  })

  describe('VEHICLES_LOADED', () => {
    const { vehiclesLoaded } = actions
    let reducer = null

    beforeEach(() => {
      reducer = reduxState.default
    })
    it('should exit loading state', () => {
      expect(
        reducer(reduxState.initialState, vehiclesLoaded()).loading,
      ).to.equal(false)
    })
  })

  describe('VEHICLE_LOADED', () => {
    const { vehicleLoaded } = actions
    let reducer = null

    beforeEach(() => {
      reducer = reduxState.default
    })
    it('should add first item', () => {
      const vehicle = vehicles[0]
      expect(
        reducer(
          reduxState.initialState,
          vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
        ).vehicles,
      ).to.deep.equal([
        {
          id: vehicle.id,
          url: vehicle.url,
          image: vehicle.image,
          detailsLoading: true,
          detailsLoaded: false,
        },
      ])
    })
    it('should add multiple items', () => {
      let vehicle = vehicles[0]
      const state = reducer(
        reduxState.initialState,
        vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
      )

      vehicle = vehicles[1]
      expect(
        reducer(state, vehicleLoaded(vehicle.id, vehicle.url, vehicle.image))
          .vehicles,
      ).to.deep.equal(
        vehicles.map(v => ({
          id: v.id,
          url: v.url,
          image: v.image,
          detailsLoading: true,
          detailsLoaded: false,
        })),
      )
    })
  })

  describe('VEHICLES_ERROR', () => {
    const { vehiclesError } = actions
    let reducer = null

    beforeEach(() => {
      reducer = reduxState.default
    })
    it('should add error', () => {
      const error = 'Not ok'
      expect(
        reducer(reduxState.initialState, vehiclesError(error)).error,
      ).to.equal(error)
    })
    it('should stop loading', () => {
      const error = 'Not ok'
      expect(
        reducer(reduxState.initialState, vehiclesError(error)).loading,
      ).to.equal(false)
    })
  })

  describe('VEHICLE_DETAIL_LOADED', () => {
    const { vehicleLoaded, vehicleDetailLoaded } = actions
    
    let reducer = null
    let state = null

    beforeEach(() => {
      reducer = reduxState.default

      let vehicle = vehicles[0]
      state = reducer(
        reduxState.initialState,
        vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
      )
      vehicle = vehicles[1]
      state = reducer(
        state,
        vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
      )
    })
    
    it('should set state of according vehicle', () => {
      const { id, description, price } = vehicleDetails[0]
      const vehicle = reducer(state, vehicleDetailLoaded(id, description, price)).vehicles.find(v => v.id === id)
      expect(vehicle.detailsLoading).to.equal(false)
      expect(vehicle.detailsLoaded).to.equal(true)
      expect(vehicle.description).to.equal(description)
      expect(vehicle.price).to.equal(price)
    })
    
    it('should not set state of other vehicles', () => {
      const { id, description, price } = vehicleDetails[0]
      const vehicle = reducer(state, vehicleDetailLoaded(id, description, price)).vehicles.find(v => v.id !== id)
      expect(vehicle.detailsLoading).to.equal(true)
      expect(vehicle.detailsLoaded).to.equal(false)
      expect(vehicle.description).to.not.exist
      expect(vehicle.price).to.not.exist
    })
  })
  describe('VEHICLE_DETAIL_ERROR', () => {
    const { vehicleLoaded, vehicleDetailError } = actions
    
    let reducer = null
    let state = null

    beforeEach(() => {
      reducer = reduxState.default

      let vehicle = vehicles[0]
      state = reducer(
        reduxState.initialState,
        vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
      )

      vehicle = vehicles[1]
      state = reducer(
        state,
        vehicleLoaded(vehicle.id, vehicle.url, vehicle.image),
      )
    })

    it('should set state of according vehicle', () => {
      const { id, description, price } = vehicleDetails[0]
      const error = 'Not good'
      const vehicle = reducer(state, vehicleDetailError(id, error)).vehicles.find(v => v.id === id)
      expect(vehicle.error).to.equal(error)
    })
  })
})
