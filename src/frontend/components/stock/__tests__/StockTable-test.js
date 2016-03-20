jest.unmock('../StockTable')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import StockTable from '../StockTable'
import StockTableRow from '../StockTableRow';


describe('StockTable', () => {

   it('Display the the stock in a table', () => {

       const stockData = [{reference: "ref1"}, {reference: "ref2"}];

       let instance = TestUtils.renderIntoDocument(<StockTable data={stockData} />);
       expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;

       expect(StockTableRow.mock.calls.length).toBe(2);
    });

});
