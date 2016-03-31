jest.unmock('../ModelQuickForm')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import ModelQuickForm from '../ModelQuickForm'
import AutosuggestWrapper from '../../../utils/AutosuggestWrapper';

describe('ModelQuickForm', () => {

   it('Display a quick form for adding model', () => {

       const brandData = {brands: [{name: "Shure"}, {name: "RME"}]}

       TestUtils.renderIntoDocument(<ModelQuickForm viewer={brandData} />)

       expect(AutosuggestWrapper.mock.calls.length).toBe(1)

       var autosuggestCallArgs = AutosuggestWrapper.mock.calls[0][0];
       expect(autosuggestCallArgs.inputText).toContain("Select a brand ...")
       expect(autosuggestCallArgs.multiSection).toBe(false)
       expect(autosuggestCallArgs.resetInputValue).toBe(false)
       expect(autosuggestCallArgs.suggestions.length).toBe(2);
       expect(autosuggestCallArgs.suggestions[0].name).toEqual("Shure");
       expect(autosuggestCallArgs.suggestions[1].name).toEqual("RME");
    });

    it('Reset input value and call props method with good params after form submit', () => {

        const brandData = {brands: [{name: "Shure"}, {name: "RME"}]}


        var onAddNewModelMock = jest.genMockFunction();
        let instance = TestUtils.renderIntoDocument(<ModelQuickForm viewer={brandData} onAddNewModel={onAddNewModelMock}/>)

        var modelInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
        modelInput.value = 'SM 58'
        TestUtils.Simulate.change(modelInput)
        TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(instance, 'button'));

        modelInput = TestUtils.findRenderedDOMComponentWithTag(instance, 'input')
        expect(modelInput.textContent).toEqual('');

        expect(onAddNewModelMock.mock.calls.length).toBe(1)
        expect(onAddNewModelMock.mock.calls[0][0]).toEqual("SM 58")
        expect(onAddNewModelMock.mock.calls[0][1]).toEqual("")

    });

});
