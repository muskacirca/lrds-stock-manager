jest.unmock('../ItemDisplay')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import ItemDisplay from '../ItemDisplay'

describe('ItemDisplay', () => {

    const itemData = {
        reference: "RMEMODEL-1",
        isInStock: true,
        state: "1",
        model: {
            name: "model-1",
            brand: {name: "RME"},
            description: "C'est un super model de test",
            domains: [{name: "domain1"}],
            subCategories: [{name: "subCategory1"}, {name: "subCategory2"}]
        }
    }

    it('Display an item ', () => {

        let instance = TestUtils.renderIntoDocument(<ItemDisplay item={itemData}/>);

        var title = TestUtils.findRenderedDOMComponentWithTag(instance, 'strong');
        expect(title.textContent).toEqual("RME - model-1");

        var modelDescription = TestUtils.findRenderedDOMComponentWithTag(instance, 'p');
        expect(modelDescription.textContent).toEqual("C'est un super model de test");
    })
});
