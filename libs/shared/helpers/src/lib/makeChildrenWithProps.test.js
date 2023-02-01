/* eslint-disable react/prop-types  */
import React from 'react';
import { shallow } from 'enzyme';

import { makeChildrenWithProps } from '../helpers';

const Sauron = () => (
  <RuleThemAllWrapper>
    <Nazgul horse="scary" />
  </RuleThemAllWrapper>
);

const RuleThemAllWrapper = ({ children }) => {
  const childrenWithProps = makeChildrenWithProps({
    children,
    extraProps: { race: 'fallen men' },
  });

  return <React.Fragment>{childrenWithProps}</React.Fragment>;
};

const Nazgul = ({ horse }) => <React.Fragment>{horse}</React.Fragment>;

describe('makeChildrenWithProps() tests', () => {
  it('correctly adds props to a child', () => {
    const wrapper = shallow(<Sauron />);

    expect(
      wrapper
        .find('RuleThemAllWrapper')
        .dive()
        .find('Nazgul')
    ).toHaveProp('race', 'fallen men');
  });
});
