'use strict';

jest.unmock('../FilterFunctions.js');

const items = [
                    {
                        node: {
                            reference: "ref-1",
                            isInStock: true,
                            state: {
                                severity: 1
                            },
                            model: {
                                name: "model-1",
                                brand: {name: "BMX"},
                                domains: [{name: "domain_1"}],
                                subCategories: [{name: "sub_1"}]
                            }
                        }
                    },
                    {
                        node: {
                            reference: "ref-2",
                            isInStock: true,
                            state: {
                                severity: 2
                            },
                            model: {
                                name: "model-2",
                                brand: {name: "Shure"},
                                domains: [{name: "domain_2"}],
                                subCategories: [{name: "category_2"}]
                            }
                        }
                    }
                ];

describe('filterByText', () => {
    
    it('filter nothing when there is no searched text or only one character', () => {
    
        const filterByText = require('../FilterFunctions').filterByText;
    
        var itemFiltered = filterByText("", items);
        expect(itemFiltered.length).toBe(2);
    
        itemFiltered = filterByText("2", items);
        expect(itemFiltered.length).toBe(2);
    });
    
    it('filter when a matching searched text is entered', () => {
    
        const filterByText = require('../FilterFunctions').filterByText;
    
        var itemFiltered = filterByText("-2", items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].reference).toBe("ref-2");
    });

    it('filter when searched match a brand', () => {

        const filterByText = require('../FilterFunctions').filterByText;

        console.log("items in brand : " + JSON.stringify(items))
        
        var itemFiltered = filterByText("BMX", items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].reference).toBe("ref-1");
    });

    it('filter when searched match a model', () => {
    
        const filterByText = require('../FilterFunctions').filterByText;
    
        var itemFiltered = filterByText("model-1", items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].reference).toBe("ref-1");
    });
    
    it('filter when searched match a reference', () => {
    
        const filterByText = require('../FilterFunctions').filterByText;
    
        var itemFiltered = filterByText("ref-2", items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].reference).toBe("ref-2");
    });
});