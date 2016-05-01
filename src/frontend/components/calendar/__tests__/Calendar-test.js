jest.unmock('../Calendar')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import Calendar from '../Calendar'
import CalendarColumn from '../CalendarColumn';

describe('Calendar', () => {

    const defaultDate = new Date(2016, 0, 1, 10, 30, 2)

    it('Display the default date ', () => {

        let instance = TestUtils.renderIntoDocument(<Calendar defaultDate={defaultDate} />);

        var calendarHeaderColumns = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-days-header');
        expect(calendarHeaderColumns.length).toEqual(7);
        expect(calendarHeaderColumns[0].textContent).toEqual("Mon");
        expect(calendarHeaderColumns[1].textContent).toEqual("Tue");

        var calendarBlankDays = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-blank-days');
        expect(calendarBlankDays.length).toEqual(4);

        expect(CalendarColumn.mock.calls.length).toBe(31);

        var calendarContent = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'calendar-month-row');
        expect(calendarContent.length).toEqual(5)
        expect(calendarContent[0].props.children.length).toEqual(7)
        expect(calendarContent[1].props.children.length).toEqual(7)
        expect(calendarContent[2].props.children.length).toEqual(7)
        expect(calendarContent[3].props.children.length).toEqual(7)
        expect(calendarContent[4].props.children.length).toEqual(7)
    })
});
