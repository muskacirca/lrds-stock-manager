import React from 'react'
import moment from 'moment'

import {
    Link
} from 'react-router'

class CalendarColumn extends React.Component {

    constructor(props) {
        super(props)
    }
    
    renderEventsList(events) {
        
        return events.map((event, key) => {
            return  <li key={"calendar-event-list-" + this.props.dayNumber + "-" + key}>
                        <Link to={"/event/" + event.node.id}>{event.node.name}</Link>
                    </li>
        })
    }
    
    render() {
        
        var dayNumber = this.props.dayNumber
        var now = moment()
        
        var events = this.renderEventsList(this.props.events)
        
        var className = dayNumber == now.date() 
                        && this.props.defaultDate.month() == now.month() 
                        && this.props.defaultDate.year() == now.year() ? "red" :  ""
        
        return  <div className="calendar-row-content calendar-days">
                    <div className={className + " calendar-days-tr-up"}>
                        {dayNumber}
                    </div>
                    <div className="calendar-days-content">
                        <ul className="mobile-hide">{events}</ul>
                        <div className="hidden-md hidden-sm hidden-lg">
                            <span className="badge">{events.length > 0 ? events.length : null}</span>
                        </div>
                    </div>
                </div>
    }


}

export default CalendarColumn