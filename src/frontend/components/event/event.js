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

        this.props.relay.setVariables({
            date: newDisplayDate.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: newDisplayDate})
        });
        
       
    }

    subtractCalendar() {

        var newDisplayDate = moment(this.state.defaultDate).subtract(1, 'M')

        this.props.relay.setVariables({
            date: newDisplayDate.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: newDisplayDate})
        });
        
       
    }

    getNow() {
        var now = moment()
        
        this.props.relay.setVariables({
            date: now.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: now})
        });
    }

    render() {
        
        var date = this.state.defaultDate
        var events = this.props.viewer.events.edges
        
        console.log("number of events : " + events.length)
        
        
        return  <div className="calendar-container">
                    <div className="sub-bar row">
                        <div className="sub-bar-component-centered col-md-10 col-md-offset-1">
                            <CalendarHeader defaultDate={date}
                                            increaseCalendar={this.increaseCalendar.bind(this)}
                                            subtractCalendar={this.subtractCalendar.bind(this)}
                                            getNow={this.getNow.bind(this)} />
                        

                        </div>
                    </div>
                    <Calendar defaultDate={date} events={events} />
                </div>
    }


}

export default Relay.createContainer(EventBox, {

    initialVariables: {date: null},

    prepareVariables: prevVariables => {
        
        console.log("prevVariables : " + JSON.stringify(prevVariables))
        
        var date = prevVariables.date == null 
            ? moment().format("YYYY-MM-DD") 
            : prevVariables.date
        
        return {
            ...prevVariables,
            date: date,
        };
    },

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            events(first: 100, date: $date) {
                edges {
                    node {
                        name
                        startDate
                        endDate
                    }
                }
            }
          }
        `
    }
})
