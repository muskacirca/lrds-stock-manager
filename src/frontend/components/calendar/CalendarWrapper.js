'use strict'

import React from 'react'
import moment from 'moment'

import Calendar from './Calendar'
import CalendarHeader from './CalendarHeader'

require('./calendar-style.scss');

class CalendarWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.increaseCalendar = this.increaseCalendar.bind(this);
        this.subtractCalendar = this.subtractCalendar.bind(this);
        this.getNow = this.getNow.bind(this);

        this.state = {
            displayDate: this.props.defaultDate,
            displayType: "week"
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
    
    render() {
        
        let date = this.state.displayDate;
        
        return  <div>
                    <CalendarHeader defaultDate={date} displayType={this.state.displayType}
                                    increaseCalendar={this.increaseCalendar}
                                    subtractCalendar={this.subtractCalendar}
                                    getNow={this.getNow} />
        
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
