import React from 'react'
import moment from 'moment';

import {
    getFirstDayOfMonth
} from './utils/DateUtils'

const days_name = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

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
        
        let weekRow = [];
        for(let day=0; day<7; day++) {

            let eventsOfTheDay = this.findEventsByDay(this.props.events, firstDayOfWeek);
            
            weekRow.push(<CalendarColumn defaultDate={this.state.defaultDate}
                                         dayNumber={firstDayOfWeek}
                                         events={eventsOfTheDay}
                                         key={"calendar-days-" + firstDayOfWeek} />)
            
            firstDayOfWeek++
        }

        return <div className="calendar-week-row">{weekRow}</div>
    }
    
    renderCalendarMonth(blankDays) {
        var dayNumber = 1;
        var calendar = [];

        for(var c=0; c<6; c++) {

            if(dayNumber > this.getDaysInMonth()) break;

            var weekRow =  this.renderWeekRow(dayNumber, blankDays)
            calendar.push(<div className="calendar-month-row" key={"calendar-row-" + c}>{weekRow.html}</div>)

            blankDays = [];
            dayNumber = weekRow.newDayNumber
        }

        return calendar
    }
    

    fillWithBlankDays(aRowOfDays) {

        while(aRowOfDays.length != 7) {
            aRowOfDays.push(<div className="calendar-row-content calendar-blank-days" key={"calendar-blank-days-" + aRowOfDays.length}></div>)
        }
        return aRowOfDays
    }

    renderCalendarHeader() {
        return days_name.map(day => {
            return <div className="calendar-row-content calendar-days-header" key={"calendar-days-header-" + day}>{day}</div>
        })
    }

    renderBlankDays() {
        var blankDays = [];
        var i = 0;
        while (getFirstDayOfMonth(this.state.defaultDate, "ddd") != days_name[i]) {
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

    renderWeekRow(initialDayNumber, blankDays) {

        var dayNumber = initialDayNumber;
        var counter = blankDays.length === 0 ? 0 : blankDays.length;

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

    componentWillReceiveProps(newprops) {
        this.setState({defaultDate: newprops.defaultDate})
    }

    render() {

        var calendarHeaderDays = this.renderCalendarHeader();
        var blankDays = this.renderBlankDays();
        var calendar = this.renderCalendar(blankDays);

        return  <div>
                    <div className="calendar-month-view">
                        <div className="calendar-row calendar-month-header">
                            {calendarHeaderDays}
                        </div>
                        {calendar}
                    </div>
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
