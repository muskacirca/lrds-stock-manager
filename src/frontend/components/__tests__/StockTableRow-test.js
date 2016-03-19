jest.unmock('../stock/StockTableRow')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import StockTableRow from '../stock/StockTableRow'


describe('StockTableRow', () => {

    const itemData = {
        reference: "SHUSM58-1",
        state: {severity: 1},
        model: {
            name: "SM 58",
            brand: {name: "Shure"},
            domains: [],
            subCategories: [],
            isInStock: true
        }
    }

    var mock = React.createElement(React.createClass({

        render: function() {
            return  <table>
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
        expect(columns.length).toEqual(5);
        //console.log("jjjjk: " + JSON.stringify(columns[0]))
        //expect(columns[0].innerHTML.toContain("fa fa-check"))
        //expect(list[0].innerHTML).toContain('1234');

    });

});
