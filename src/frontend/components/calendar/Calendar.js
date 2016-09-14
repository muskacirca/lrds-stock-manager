import React from 'react'
import moment from 'moment';

import {
    getFirstDayOfMonth
} from './utils/DateUtils'

import classnames from 'classnames'

const DAYS_NAME = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

import CalendarColumn from './CalendarColumn'

class Calendar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment(this.props.defaultDate)
        }
    }

    getDaysOfWeek() {
        return this.state.defaultDate.format("ddd");
    }

    getFirstDayOfWeek() {

        let day = this.state.defaultDate.format("e");
        return  this.state.defaultDate.subtract(day, 'days');
    }


    getDayLabel(dayOfWeek) {

        let day = this.state.defaultDate.format("e");
        let firstDayOfWeek = this.state.defaultDate.subtract(day, 'days');
        return firstDayOfWeek.add(dayOfWeek, 'days')
    }

    getDaysInMonth() {
        return this.state.defaultDate.daysInMonth();
    }

    renderCalendar(blankDays) {

       return this.props.displayType === "month"
        ? this.renderCalendarMonth(blankDays)
           : this.renderCalendarWeek()
    }

    renderCalendarWeek() {

        let firstDayOfWeek = this.getFirstDayOfWeek().format("D");
        let dayLabel = this.getFirstDayOfWeek().format("dddd");

        let weekRow = [];
        for(let day=0; day<7; day++) {

            let eventsOfTheDay = this.findEventsByDay(this.props.events, firstDayOfWeek);
            console.log("firstDayOfWeek : " + JSON.stringify(firstDayOfWeek));
            let dayLabel = this.getDayLabel(day).format("dddd");

            weekRow.push(<CalendarColumn defaultDate={this.state.defaultDate}
                                         label={dayLabel}
                                         dayNumber={firstDayOfWeek}
                                         events={eventsOfTheDay}
                                         key={"calendar-days-" + firstDayOfWeek} />)


            firstDayOfWeek++
        }

        return <div className="calendar-week-row">{weekRow}</div>
    }

    renderCalendarMonth(blankDays) {
        let dayNumber = 1;
        let calendar = [];

        for(let c=0; c<6; c++) {

            if(dayNumber > this.getDaysInMonth()) break;

            let weekRow =  this.renderWeekRow(dayNumber, blankDays)
            calendar.push(<div className="calendar-month-row" key={"calendar-row-" + c}>{weekRow.html}</div>)

            blankDays = [];
            dayNumber = weekRow.newDayNumber
        }

        return calendar
    }

    renderWeekRow(initialDayNumber, blankDays) {

        let dayNumber = initialDayNumber;
        let counter = blankDays.length === 0 ? 0 : blankDays.length;

        for(var c=counter ; c < 7; c++) {
            if(dayNumber > this.getDaysInMonth()) break;

            let eventsOfTheDay = this.findEventsByDay(this.props.events, dayNumber);

            blankDays.push(<CalendarColumn defaultDate={this.state.defaultDate}
                                           dayNumber={dayNumber}
                                           events={eventsOfTheDay}
                                           key={"calendar-days-" + dayNumber} />);
            dayNumber++
        }



        return {html: this.fillWithBlankDays(blankDays), newDayNumber: dayNumber}
    }


    fillWithBlankDays(aRowOfDays) {

        while(aRowOfDays.length != 7) {
            aRowOfDays.push(<div className="calendar-row-content calendar-blank-days" key={"calendar-blank-days-" + aRowOfDays.length}></div>)
        }
        return aRowOfDays
    }

    renderCalendarHeader() {
        if(this.props.displayType == "month") {
            let days = DAYS_NAME.map(day => {
                return  <div className="calendar-row-content calendar-days-header" key={"calendar-days-header-" + day}>
                            {day}
                        </div>
            });

            return  <div className="calendar-row calendar-month-header">{days}</div>
        }
    }

    renderBlankDays() {
        let blankDays = [];
        let i = 0;
        while (getFirstDayOfMonth(this.state.defaultDate, "ddd") != DAYS_NAME[i]) {
            blankDays[i] = <div className="calendar-row-content calendar-blank-days" key={"calendar-blank-days-" + i}></div>
            i++;
        }

        return blankDays
    }

    findEventsByDay(events, dayNumber) {

        return events != undefined
            ?   events.filter(event => {
                    return moment(event.node.startDate).dates() == dayNumber
                })
            : []
    }

    componentWillReceiveProps(newprops) {
        this.setState({defaultDate: newprops.defaultDate})
    }

    render() {

        let calendarHeaderDays = this.renderCalendarHeader();
        let blankDays = this.renderBlankDays();
        let calendar = this.renderCalendar(blankDays);
        
        console.log("this.props.displayType : " + JSON.stringify(this.props.displayType));
        
        let calendarClass = classnames({"calendar-month-view": this.props.displayType == "month"}, 
                                        {"calendar-week-view": this.props.displayType == "week"});

        return  <div className={calendarClass}>
                    {calendarHeaderDays}
                    {calendar}
                </div>

    }


}

Calendar.propTypes = {
    events: React.PropTypes.array,
    displayType:  React.PropTypes.oneOf(['month', 'week'])
};

Calendar.defaultProps = {
    defaultDate: moment(),
    displayType: "month"
};

export default Calendar
