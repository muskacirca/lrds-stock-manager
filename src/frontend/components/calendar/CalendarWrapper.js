'use strict';

import React from 'react'
import moment from 'moment'

import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'

require('./style/calendar-style.scss');

class CalendarWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.increaseCalendar = this.increaseCalendar.bind(this);
        this.subtractCalendar = this.subtractCalendar.bind(this);
        this.getNow = this.getNow.bind(this);

        this.state = {
            displayDate: this.props.defaultDate,
            displayType: "month"
        }
    }

    increaseCalendar() {

        let unit = this.state.displayType === "month" ? "M" : "w";

        let newDisplayDate = moment(this.state.displayDate).add(1, unit);
        this.setState({displayDate: newDisplayDate}, () => {this.props.handleDateChange(this.state.displayDate)})
    }

    subtractCalendar() {

        let unit = this.state.displayType === "month" ? "M" : "w";
        let newDisplayDate = moment(this.state.displayDate).subtract(1, unit);
        this.setState({displayDate: newDisplayDate}, () => {this.props.handleDateChange(this.state.displayDate)})
    }

    getNow() {
        this.setState({displayDate: moment()}, () => {this.props.handleDateChange(this.state.displayDate)})
    }

    onChangeDisplayType(type) {
        this.setState({displayType: type})
    }

    render() {

        let date = this.state.displayDate;

        return  <div className="calendar-container">
                    <CalendarHeader defaultDate={date}
                                    increaseCalendar={this.increaseCalendar.bind(this)}
                                    subtractCalendar={this.subtractCalendar.bind(this)}
                                    displayType={this.state.calendarDisplayType}
                                    onChangeDisplayType={this.onChangeDisplayType.bind(this)}
                                    getNow={this.getNow.bind(this)} />

                    <Calendar defaultDate={date} events={this.props.events}  displayType={this.state.displayType} />
                </div>
    }
}


CalendarWrapper.propTypes = {
    defaultDate: React.PropTypes.object,
    events: React.PropTypes.array.isRequired,
    handleDateChange: React.PropTypes.func.isRequired
};

CalendarWrapper.defaultProps = {
    defaultDate: moment(),
    events: []
};


export default CalendarWrapper
