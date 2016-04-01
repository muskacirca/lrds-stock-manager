jest.unmock('../ItemForm')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import ItemForm from '../ItemForm'
import AutosuggestWrapper from '../../../utils/AutosuggestWrapper';

import ItemFormDisplay from '../../ItemFormDisplay'

describe('ItemForm', () => {

    const itemFormData = {
        models: {
            edges: [
                {
                    node: {
                        name: "model-1",
                        brand: {name: "RME"},
                        domains: [{name: "domain1"}],
                        subCategories: [{name: "subCategory2"}]
                    }
                },
                {
                    node: {
                        name: "model-2",
                        brand: {name: "Shure"},
                        domains: [{name: "domain2"}],
                        subCategories: [{name: "subCategory1"}]
                    }
                }
            ]
        },
        domains: [
            {name: "domain1"},
            {name: "domain2"}
        ],
        subCategories: [
            {name: "subCategory1", category: {name: "category1"}},
            {name: "subCategory2", category: {name: "category1"}}
        ],
        states: [
            {name: "ok", severity: 1},
            {name: "ko", severity: 2},
            {name: "melon", severity: 3},
            {name: "poire", severity: 4},
        ]
    };

    beforeEach(() => {
        ItemFormDisplay.mockClear();
    });

    it('Display a form for adding an item', () => {

        TestUtils.renderIntoDocument(<ItemForm viewer={itemFormData}/>)

        expect(AutosuggestWrapper.mock.calls.length).toBe(3)

        var autosuggestModelCallArgs = AutosuggestWrapper.mock.calls[0][0];
        expect(autosuggestModelCallArgs.inputText).toContain("Select a model ...")
        expect(autosuggestModelCallArgs.multiSection).toBe(true)
        expect(autosuggestModelCallArgs.resetInputValue).toBe(true)
        expect(autosuggestModelCallArgs.suggestions.length).toBe(2);
        expect(autosuggestModelCallArgs.suggestions[0].suggestions[0].name).toEqual("model-1");
        expect(autosuggestModelCallArgs.suggestions[0].suggestions[0].section).toEqual("RME");
        expect(autosuggestModelCallArgs.suggestions[0].title).toEqual("RME");
        expect(autosuggestModelCallArgs.suggestions[1].suggestions[0].name).toEqual("model-2");
        expect(autosuggestModelCallArgs.suggestions[1].suggestions[0].section).toEqual("Shure");
        expect(autosuggestModelCallArgs.suggestions[1].title).toEqual("Shure");

        var autosuggestDomainCallArgs = AutosuggestWrapper.mock.calls[1][0];
        expect(autosuggestDomainCallArgs.inputText).toContain("Select a domain ...")
        expect(autosuggestDomainCallArgs.multiSection).toBe(false)
        expect(autosuggestDomainCallArgs.resetInputValue).toBe(true)
        expect(autosuggestDomainCallArgs.suggestions.length).toBe(2);
        expect(autosuggestDomainCallArgs.suggestions[0].name).toEqual("domain1");
        expect(autosuggestDomainCallArgs.suggestions[1].name).toEqual("domain2");

        var autosuggestSubCategoriesCallArgs = AutosuggestWrapper.mock.calls[2][0];
        expect(autosuggestSubCategoriesCallArgs.inputText).toContain("Select a category ...")
        expect(autosuggestSubCategoriesCallArgs.multiSection).toBe(true)
        expect(autosuggestSubCategoriesCallArgs.resetInputValue).toBe(true)
        expect(autosuggestSubCategoriesCallArgs.suggestions.length).toBe(1);
        expect(autosuggestSubCategoriesCallArgs.suggestions[0].suggestions[0].name).toEqual("subCategory1");
        expect(autosuggestSubCategoriesCallArgs.suggestions[0].suggestions[0].section).toEqual("category1");
        expect(autosuggestSubCategoriesCallArgs.suggestions[0].suggestions[1].name).toEqual("subCategory2");
        expect(autosuggestSubCategoriesCallArgs.suggestions[0].suggestions[1].section).toEqual("category1");
        expect(autosuggestSubCategoriesCallArgs.suggestions[0].title).toEqual("category1");

        expect(ItemFormDisplay.mock.calls.length).toBe(0)
    });

    it('reset item feature severity when selection new model', () => {

        var instance = TestUtils.renderIntoDocument(<ItemForm viewer={itemFormData}/>)

        var options = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'option')
        expect(options.length).toBe(5)

        var select = TestUtils.findRenderedDOMComponentWithTag(instance, 'select')
        TestUtils.Simulate.change(select, { target: { value: 'ok' } });
        
        var select = TestUtils.findRenderedDOMComponentWithTag(instance, 'select')
        TestUtils.Simulate.change(select, { target: { value: 'ok' } });
        //
        // expect(ItemFormDisplay.mock.calls.length).toBe(1)
        // var itemFormDisplayArgs = ItemFormDisplay.mock.calls[0][0];
        //
        // expect(itemFormDisplayArgs.item.state.severity).toContain("1")


    });
})
