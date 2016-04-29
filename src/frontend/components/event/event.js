import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'

import Calendar from './../calendar/Calendar'
import CalendarHeader from './../calendar/CalendarHeader'

class EventBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment()
        }
    }

    increaseCalendar() {

        var newDisplayDate = moment(this.state.defaultDate).add(1, 'M')
        this.setState({defaultDate: newDisplayDate})
    }

    subtractCalendar() {

        var newDisplayDate = moment(this.state.defaultDate).subtract(1, 'M')
        this.setState({defaultDate: newDisplayDate})
    }

    getNow() {
        this.setState({defaultDate: moment()})
    }

    render() {
        
        var date = this.state.defaultDate

        return  <div className="calendar-container">
                    <div className="sub-bar row">
                        <div className="col-md-10 col-md-offset-1">
                            <CalendarHeader defaultDate={date}
                                            increaseCalendar={this.increaseCalendar.bind(this)}
                                            subtractCalendar={this.subtractCalendar.bind(this)}
                                            getNow={this.getNow.bind(this)} />
                        

                        </div>
                    </div>
                    <div className="col-md-10 col-md-offset-1">
                        <Calendar defaultDate={date} />
                    </div>
                </div>
    }


}

export default Relay.createContainer(EventBox, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    }
})
