// // jest.mock('../../utils/AuthService')
// // jest.unmock('../stock.js')
//
// import React from 'react';
// import TestUtils from 'react-addons-test-utils'
// import Stock from '../stock'
//
// import StockNavigationBar from '../StockNavigationBar'
//
//
// describe('stock', () => {
//
//     const viewer = {
//         cart: {
//             count: 1,
//             selectedItems: {
//                 reference: "ref-1"
//             }
//         },
//         items: {
//             edges: [
//                 {
//                     node: {
//                         reference: "ref-1",
//                         isInStock: true,
//                         state: {
//                             severity: 1
//                         },
//                         model: {
//                             name: "model-1",
//                             brand: {name: "BMX"},
//                             domains: [{name: "domain_1"}],
//                             subCategories: [{name: "sub_1"}]
//                         }
//                     }
//                 },
//                 {
//                     node: {
//                         reference: "ref-2-1",
//                         isInStock: true,
//                         state: {
//                             severity: 2
//                         },
//                         model: {
//                             name: "model-2",
//                             brand: {name: "Shure"},
//                             domains: [{name: "domain_2"}],
//                             subCategories: [{name: "category_2"}]
//                         }
//                     }
//                 }
//             ]
//         }
//     };
//
//     beforeEach(() => {
//        
//
//     });
//
//     it('Display the stock navigation bar', () => {
//
//         // let instance = TestUtils.renderIntoDocument(<Stock viewer={viewer}/>);
//         // expect(StockNavigationBar.mocks.calls.length).toEqual(1);
//
//     });
//
//
// })
