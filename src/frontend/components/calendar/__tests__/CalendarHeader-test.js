jest.unmock('../CalendarHeader')

import React from 'react';
import TestUtils from 'react-addons-test-utils'
import CalendarHeader from '../CalendarHeader'

describe('CalendarHeader', () => {

    const defaultDate = new Date(2016, 0, 1, 10, 30, 2)

    it('Display the default date ', () => {

        let instance = TestUtils.renderIntoDocument(<CalendarHeader defaultDate={defaultDate}/>);

        var calendarHeader = TestUtils.findRenderedDOMComponentWithClass(instance, 'calendar-month-year');
        expect(calendarHeader.textContent).toEqual("Friday, January 1st 2016, 10:30:02 am")
    })
});
