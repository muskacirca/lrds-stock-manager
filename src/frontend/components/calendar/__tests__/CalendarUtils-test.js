jest.unmock('../utils/CalendarUtils.js')

import React from 'react';
import moment from 'moment'
import {
    computeFreeTime
} from '../utils/CalendarUtils'

describe('Calendar', () => {

    it('should display please call', () => {

        let events = [
            {
                start: {dateTime: moment("2013-02-08 08:59:26.123")},
                end: {dateTime: moment("2013-02-08 11:00:26.123")}
            },
            {
                start: {dateTime: moment("2013-02-08 12:30:26.123")},
                end: {dateTime: moment("2013-02-08 14:00:26.123")}
            }];


        expect(computeFreeTime(moment(), events)).toBe("please call")
    });

    it('should be fully booked', () => {

        let events = [
            {
                start: {dateTime: moment("2013-02-08 08:59:26.123")},
                end: {dateTime: moment("2013-02-08 19:00:26.123")}
            }
        ];


        expect(computeFreeTime(moment(), events)).toBe("FULLY BOOKED")
    });

    it('should be fully booked with small events', () => {

        let events = [
            {
                start: {dateTime: moment("2013-02-08 08:00:26.123")},
                end: {dateTime: moment("2013-02-08 09:00:26.123")}
            },
            {
                start: {dateTime: moment("2013-02-08 09:59:26.123")},
                end: {dateTime: moment("2013-02-08 13:00:26.123")}
            },
            {
                start: {dateTime: moment("2013-02-08 13:10:26.123")},
                end: {dateTime: moment("2013-02-08 19:00:26.123")}
            },
            {
                start: {dateTime: moment("2013-02-08 19:59:26.123")},
                end: {dateTime: moment("2013-02-08 22:00:26.123")}
            }
        ];


        expect(computeFreeTime(moment(), events)).toBe("FULLY BOOKED")
    });

    it('should be free', () => {

        let events = [
            {
                start: {dateTime: moment("2013-02-08 08:59:26.123")},
                end: {dateTime: moment("2013-02-08 11:00:26.123")}
            }];


        expect(computeFreeTime(moment(), events)).toBe("")
    })
});
