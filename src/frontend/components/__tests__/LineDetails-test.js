//jest.unmock('../LineDetails')
//
//import React from 'react';
//import TestUtils from 'react-addons-test-utils'
//import LineDetails from '../LineDetails'
//
//describe('LineDetails', () => {
//
//   it('Display the basic line information', () => {
//
//       const lineData = {iccId: "1234", msisdn: "+1234", transatelId: "987"};
//
//       let instance = TestUtils.renderIntoDocument(<LineDetails line={lineData}/>);
//       expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;
//
//       var list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');
//       expect(list.length).toEqual(4);
//       expect(list[0].innerHTML).toContain('1234');
//
//    });
//
//});