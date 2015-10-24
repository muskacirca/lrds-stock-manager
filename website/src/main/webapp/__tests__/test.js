// __tests__/test.js

import React from 'react'
import ReactDOM from 'react-dom'
import StockComponent from'../app/components/stock.js'
import SearchComponent from'../app/components/stock.js'
import TestUtils from 'react-addons-test-utils'

jest.dontMock('../app/components/stock.js');
describe('SearchFieldInStock', function() {
    it('select product matching input value', function() {

        var stockComponent = TestUtils.renderIntoDocument(
            <StockComponent searchedText="fire" data="resources/products.json"/>
        );


        //// Verify that it's Off by default
        var searchComponent = TestUtils.findRenderedDOMComponentWithTag(stockComponent, "br");
        expect(ReactDOM.findDOMNode(searchComponent).props.from()).toEqual("stock");
        //
        //// Simulate a click and verify that it is now On
        //var input = TestUtils.findRenderedDOMComponentWithTag(
        //    checkbox, 'input');
        //TestUtils.Simulate.change(input);
        //expect(React.findDOMNode(label).textContent).toEqual('On');

    });
});