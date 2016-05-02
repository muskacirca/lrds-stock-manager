jest.unmock('../Dashboard')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import Dashboard from '../Dashboard'
import DashboardHeader from '../DashboardHeader'

describe('Dashboard', () => {

    const viewer = {
        items : {
            edges: [
                {node: {state: {severity: 1}}},
                {node: {state: {severity: 1}}},
                {node: {state: {severity: 2}}},
                {node: {state: {severity: 3}}},
                {node: {state: {severity: 3}}},
                {node: {state: {severity: 4}}},
            ]
        }
    }


    it('Display the dashboard header', () => {
        TestUtils.renderIntoDocument(<Dashboard viewer={viewer}/>);
        expect(DashboardHeader.mock.calls.length).toBe(1);
    })

    it('Compute the good percentage', () => {
        
        let instance = TestUtils.renderIntoDocument(<Dashboard viewer={viewer}/>);
        
        var spans = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span');
        expect(spans.length).toEqual(3);
        expect(spans[0].innerHTML).toContain("33");
        expect(spans[1].innerHTML).toContain("50");
        expect(spans[2].innerHTML).toContain("17");
    })

    it('Display the right item numbers by state', () => {

        let instance = TestUtils.renderIntoDocument(<Dashboard viewer={viewer}/>);

        var titles = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'h3');
        expect(titles.length).toEqual(3);
        expect(titles[0].innerHTML).toContain("2");
        expect(titles[1].innerHTML).toContain("3");
        expect(titles[2].innerHTML).toContain("1");
    })
});
