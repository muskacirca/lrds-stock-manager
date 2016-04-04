jest.unmock('../StockTableRow')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import StockTableRow from '../StockTableRow'


describe('StockTableRow', () => {

    const itemData = {
        reference: "SHUSM58-1",
        state: {severity: 1},
        isInStock: true,
        model: {
            name: "SM 58",
            brand: {name: "Shure"},
            domains: [],
            subCategories: [],
        }
    }

    var mock = React.createElement(React.createClass({

        render: function() {
            return  <table>
                        <thead/>
                        <tbody>
                            <StockTableRow item={itemData} />
                        </tbody>
                    </table>
        }

    }))

    it('Display a line of the stock', () => {

        let instance = TestUtils.renderIntoDocument(mock);
        expect(TestUtils.isCompositeComponent(instance)).toBeTruthy() ;

        var columns = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'td');
        expect(columns.length).toEqual(6);
        expect(columns[0].innerHTML).toContain("fa fa fa-square green");
        expect(columns[1].textContent).toEqual("SM 58");
        expect(columns[2].textContent).toEqual("Shure");
        expect(columns[3].textContent).toEqual("SHUSM58-1");
        expect(columns[4].innerHTML).toContain("fa fa-check");
        expect(columns[5].innerHTML).toContain("fa fa-cart-plus");

    });

});
