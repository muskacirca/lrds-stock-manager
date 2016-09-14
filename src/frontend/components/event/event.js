import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'

import CalendarWrapper from './../calendar/CalendarWrapper'

class EventBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment(),
            calendarDisplayType: "month"
        }
    }
    
    handleDateChange(displayDate) {
        this.props.relay.setVariables({
            date: displayDate.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            this.setState({defaultDate: displayDate})
        });
    }
    
    render() {

        let date = this.state.defaultDate;
        let events = this.props.viewer.events.edges;

        return  <CalendarWrapper 
                    defaultDate={date}
                    events={events}
                    handleDateChange={this.handleDateChange.bind(this)}
                 />
    }
}

export default Relay.createContainer(EventBox, {

    initialVariables: {date: null},

    prepareVariables: prevVariables => {
        
        let date = prevVariables.date == null
            ? moment().format("YYYY-MM-DD")
            : prevVariables.date;

        return {
            ...prevVariables,
            date: date
        };
    },

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            events(first: 100, date: $date) {
                edges {
                    node {
                        id
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
