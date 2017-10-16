const React = require('react')
const enzyme = require('enzyme')
const expect = require('chai').expect
const sinon = require('sinon')

const { render, mount, shallow } = enzyme

const VehicleList = require('../../src/components/VehicleList').default
const Error = require('../../src/components/Error').default
const Loading = require('../../src/components/Loading').default

describe('<VehicleList />', () => {
  it('renders', () => {
    const wrapper = shallow(<VehicleList vehicles={[]} />)
    expect(wrapper.find('.vehicle-list').exists()).to.equal(true)
  })

  it('loads vehicles', () => {
    const loadVehicles = sinon.spy()
    const id = 'id'
    const url = `/api/vehicles/${id}`

    const wrapper = mount(
      <VehicleList loadVehicles={loadVehicles} loading={true} />,
    )
    expect(loadVehicles.called).to.equal(true)
    expect(loadVehicles.callCount).to.equal(1)
  })

  it('displays error', () => {
    const error = 'Not good.'

    const wrapper = shallow(<VehicleList error={error} />)
    const errorWrapper = shallow(<Error message={error} />)
    expect(wrapper.html()).to.deep.equal(errorWrapper.html())
  })
  
    it('displays loading', () => {
      const wrapper = shallow(<VehicleList loading={true} />)
      const loadingWrapper = shallow(<Loading />)
      expect(wrapper.html()).to.deep.equal(loadingWrapper.html())
    })
    
    it('renders vehicles', () => {
      const vehicles = [
        { id: '0' },
        { id: '1' },
        { id: '2' },
        { id: '3' },
      ]
  
      const wrapper = render(<VehicleList vehicles={vehicles} />)
      expect(wrapper.find('.vehicle')).to.have.length(vehicles.length)
    })
})
