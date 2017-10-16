const React = require('react')
const shallow = require('enzyme').shallow
const expect = require('chai').expect

const Error = require('../../src/components/Error').default

describe('<Error />', () => {
    const messages = ['test message', 'something wrong']
    messages.forEach(m => {
      it(`renders with message '${m}'`, () => {
      const wrapper = shallow(<Error message={m} />)
      expect(wrapper.html()).to.equal(`<h1>Error: ${m}</h1>`)
    })
  })
})