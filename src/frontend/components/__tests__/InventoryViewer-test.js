//jest.unmock('../InventoryViewer')
//
//import React from 'react';
//import TestUtils from 'react-addons-test-utils'
//import InventoryViewer from '../InventoryViewer'
//
//
//describe('InventoryViewer', () => {
//
//   it('Display line inventory information', () => {
//
//       const lineData = {iccId: "1234", msisdn: "+1234", transatelId: "987" ,
//           inventory: {
//               packages : [{
//               packageRef: 'packageRef',
//               Status: 'Status',
//               ActivationDate: '2012-11-10 15:25:30',
//               InactivationDate: '2012-11-10 15:25:30',
//               BillingActivationDate: '2012-11-10 15:25:30',
//               BillingInactivationDate: '2012-11-10 15:25:30',
//               RestrictionEndDate: '2012-11-10 15:25:30'}
//               ]
//           }};
//
//       let instance = TestUtils.renderIntoDocument(<InventoryViewer line={lineData}/>);
//       expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;
//
//       var list = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'inventory');
//       expect(list.length).toEqual(1);
//       //expect(list[0].innerHTML).toContain('1234');
//
//    });
//
//});