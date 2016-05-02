'use strict';
var _ =  require('lodash')

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

const threeItems = _.concat(items, {
    node: {
        reference: "ref-3",
        isInStock: true,
        state: {
            severity: 2
        },
        model: {
            name: "model-3",
            brand: {name: "WYZ"},
            domains: [{name: "domain_3"}],
            subCategories: [{name: "category_3"}]
        }
    }
})

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

describe('filterByTag', () => {

    it('filter nothing when there is no tag', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;

        var itemFiltered = filterByTag([], items);
        expect(itemFiltered.length).toBe(2);
    });

    it('filter when a tag is entered corresponding to a model', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;

        var itemFiltered = filterByTag(["model-1"], items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].node.reference).toBe("ref-1");
    });
    
    it('filter when a tag is entered corresponding to a brand', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;

        var itemFiltered = filterByTag(["Shure"], items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].node.reference).toBe("ref-2");
    });

    it('filter when a tag is entered corresponding to a reference', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;

        var itemFiltered = filterByTag(["ref-2"], items);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].node.reference).toBe("ref-2");
    });

    it('Display nothing when two different tags match two different rows', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;
        
        var itemFiltered = filterByTag(["ref-2", "ref-1"], threeItems);
        expect(itemFiltered.length).toBe(2);
    });

    it('Display nothing when two different tags match two different rows', () => {

        const filterByTag = require('../FilterFunctions').filterByTag;

        var itemFiltered = filterByTag(["model-3"], threeItems);
        expect(itemFiltered.length).toBe(1);
        expect(itemFiltered[0].node.reference).toBe("ref-3");
    });
});


