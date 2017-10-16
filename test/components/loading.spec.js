const React = require('react')
const shallow = require('enzyme').shallow
const expect = require('chai').expect

const Loading = require('../../src/components/Loading').default

describe('<Loading />', () => {
  it('renders', () => {
    const wrapper = shallow(<Loading />)
    expect(wrapper.html()).to.equal('<h1>Loading...</h1>')
  })
})
