jest.unmock('../stock/stock')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import Stock from '../stock/stock'


describe('stock', () => {

   it('Display the stock', () => {

       const stockData = {viewer :{items: {edges: [{node: {}}]}}};

       let instance = TestUtils.renderIntoDocument(<Stock viewer={lineData}/>);
       expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;

    });

});