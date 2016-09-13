jest.unmock('../Calendar')

import React from 'react';
import Calendar from '../Calendar'
import CalendarColumn from '../CalendarColumn';

import renderer from 'react-test-renderer'

describe('Calendar', () => {

    const defaultDate = new Date(2016, 0, 1, 10, 30, 2)


    it('Display the default date in week view', () => {

        const tree = renderer.create(
            <Calendar defaultDate={defaultDate} displayType="week" />
        ).toJSON();
        
        expect(tree).toMatchSnapshot();
        
    });
    
    
    it('Display the default date in month view ', () => {

        const tree = renderer.create(
            <Calendar defaultDate={defaultDate} displayType="month" />
        ).toJSON();

        expect(tree).toMatchSnapshot();
        
        // let instance = TestUtils.renderIntoDocument(<Calendar defaultDate={defaultDate} />);

        // var calendarHeaderColumns = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-days-header');
        // expect(calendarHeaderColumns.length).toEqual(7);
        // expect(calendarHeaderColumns[0].textContent).toEqual("Mon");
        // expect(calendarHeaderColumns[1].textContent).toEqual("Tue");
        //
        // var calendarBlankDays = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-blank-days');
        // expect(calendarBlankDays.length).toEqual(11);
        //
        // expect(CalendarColumn.mock.calls.length).toBe(31);
        //
        // var calendarContent = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-month-row');
        // expect(calendarContent.length).toEqual(6)
        // expect(calendarContent[0].props.children.length).toEqual(7)
        // expect(calendarContent[1].props.children.length).toEqual(7)
        // expect(calendarContent[2].props.children.length).toEqual(7)
        // expect(calendarContent[3].props.children.length).toEqual(7)
        // expect(calendarContent[4].props.children.length).toEqual(7)
    })
});
