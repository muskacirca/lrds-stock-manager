import React from 'react'
import moment from 'moment'

class CalendarColumn extends React.Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        
        
    
        var dayNumber = this.props.dayNumber
        var now = moment()
        
        var className = dayNumber == now.date() 
                        && this.props.defaultDate.month() == now.month() 
                        && this.props.defaultDate.year() == now.year() ? "red" :  ""
        
        return  <div className="calendar-row-content calendar-days">
                    <div className={className + " calendar-days-tr-up"}>
                        {dayNumber}
                    </div>
                    <div className="calendar-days-content">
                       
                    </div>
                </div>
    }


}

export default CalendarColumn