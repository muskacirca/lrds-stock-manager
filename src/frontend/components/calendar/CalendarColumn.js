import React from 'react'
import moment from 'moment'

class CalendarColumn extends React.Component {

    constructor(props) {
        super(props)
    }
    
    renderEventsList(events) {
        
        return events.map((event, key) => {
            return <li key={"calendar-event-list-" + this.props.dayNumber + "-" + key}>{event.node.name}</li>
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
                       <ul>
                           {events}
                       </ul>
                    </div>
                </div>
    }


}

export default CalendarColumn