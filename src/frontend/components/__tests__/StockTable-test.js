jest.unmock('../stock/StockTable')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import StockTable from '../stock/StockTable'


describe('StockTable', () => {

   it('Display the the stock in a table', () => {

       const stockData = [{reference: "ref1"}, {reference: "ref2"}];

       let instance = TestUtils.renderIntoDocument(<StockTable data={stockData} />);
       expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;

       //var list = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'StockTableRow');
       //expect(list.length).toEqual(2);
       //expect(list[0].innerHTML).toContain('1234');

    });

});
