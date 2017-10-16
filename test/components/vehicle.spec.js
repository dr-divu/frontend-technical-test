const React = require('react')
const enzyme = require('enzyme')
const expect = require('chai').expect
const sinon = require('sinon')

const { mount, shallow } = enzyme

const Vehicle = require('../../src/components/Vehicle').default
const Error = require('../../src/components/Error').default
const Loading = require('../../src/components/Loading').default

describe('<Vehicle />', () => {
  it('renders', () => {
    const wrapper = shallow(<Vehicle />)
    expect(wrapper.find('.vehicle').exists()).to.equal(true)
  })

  it('loads details by id and url', () => {
    const loadVehicleDetail = sinon.spy()
    const id = 'id'
    const url = `/api/vehicles/${id}`

    const wrapper = mount(
      <Vehicle url={url} id={id} loadVehicleDetail={loadVehicleDetail} />,
    )
    expect(loadVehicleDetail.called).to.equal(true)
    expect(loadVehicleDetail.callCount).to.equal(1)
    expect(loadVehicleDetail.args).to.deep.equal([[id, url]])
  })

  it('displays error', () => {
    const error = 'Not good.'

    const wrapper = shallow(<Vehicle error={error} />)
    const errorWrapper = shallow(<Error message={error} />)
    expect(wrapper.html()).to.deep.equal(errorWrapper.html())
  })

  it('displays loading', () => {
    const wrapper = shallow(<Vehicle loading={true} />)
    const loadingWrapper = shallow(<Loading />)
    expect(wrapper.html()).to.deep.equal(loadingWrapper.html())
  })

  it('displays description', () => {
    const content = 'A nice car.'
    const selector = 'vehicle__information__description'
    const wrapper = shallow(<Vehicle description={content} />)

    expect(wrapper.find(`.${selector}`).html()).to.equal(
      `<div class="${selector}">${content}</div>`,
    )
  })

  it('displays name', () => {
    const content = 'Xf.'
    const selector = 'vehicle__information__name'
    const wrapper = shallow(<Vehicle id={content} />)

    expect(wrapper.find(`.${selector}`).html()).to.equal(
      `<div class="${selector}">${content}</div>`,
    )
  })

  it('displays price', () => {
    const content = '123$'
    const selector = 'vehicle__information__price'
    const wrapper = shallow(<Vehicle price={content} />)

    expect(wrapper.find(`.${selector}`).html()).to.equal(
      `<div class="${selector}">From ${content}</div>`,
    )
  })

  it('shows image', () => {
    const image = 'image.jpg'
    const selector = 'vehicle__image'
    const wrapper = shallow(<Vehicle image={image} />)

    expect(wrapper.find(`.${selector}`).html()).to.equal(
      `<div class="${selector}" style="background-image:url(${image});"></div>`,
    )
  })
})
