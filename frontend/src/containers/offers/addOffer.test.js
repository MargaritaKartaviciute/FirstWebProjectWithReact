import React from 'react';
import enzyme from 'enzyme';
import AddOffer from './addOffer.js';
import Adapter from 'enzyme-adapter-react-16';

enzyme.configure({ adapter: new Adapter() });

describe('Test add offer component', function() {
  it('should have Vilnius selection input', () => {
    const wrapper = enzyme.mount(<AddOffer />);
    const vilnius = <option name="Vilnius">Vilnius</option>;
    // expect(wrapper.contains(welcome)).to.equal(true);
    expect(wrapper.contains(vilnius)).toEqual(true);
  });

  it(`selection inputs shouldn't include Kedainiai`, () => {
    const wrapper = enzyme.mount(<AddOffer />);
    const kedainiai = <option name="Kedainiai">Kedainiai</option>;
    // expect(wrapper.contains(welcome)).to.equal(true);
    expect(wrapper.contains(kedainiai)).toEqual(false);
  });

  it(`should have a header named Kurti nauja pasiulyma`, () => {
    const wrapper = enzyme.mount(<AddOffer />);
    // expect(wrapper.contains(welcome)).to.equal(true);
    expect(wrapper.find('h1').text()).toEqual('Kurti naują pasiūlymą');
  });

  it(`there should be one form in  the component`, () => {
    const wrapper = enzyme.mount(<AddOffer />);
    // expect(wrapper.contains(welcome)).to.equal(true);
    expect(wrapper.find('form').length).toEqual(1);
  });
});
