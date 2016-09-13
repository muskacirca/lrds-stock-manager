import React from 'react'
import Relay from 'react-relay'
import moment from 'moment'

import Calendar from './../calendar/Calendar'
import CalendarHeader from './../calendar/CalendarHeader'

class EventBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment(),
            calendarDisplayType: "month"
        }
    }

    increaseCalendar() {

        let unit = this.state.calendarDisplayType == "month" ? "M" : "w";
        console.log("unit : " + JSON.stringify(unit));
        const newDisplayDate = moment(this.state.defaultDate).add(1, unit);

        this.props.relay.setVariables({
            date: newDisplayDate.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            // console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: newDisplayDate})
        });


    }

    subtractCalendar() {

        let unit = this.state.calendarDisplayType == "month" ? "M" : "w";
        const newDisplayDate = moment(this.state.defaultDate).subtract(1, unit);

        this.props.relay.setVariables({
            date: newDisplayDate.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            // console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: newDisplayDate})
        });


    }

    getNow() {
        let now = moment()

        this.props.relay.setVariables({
            date: now.format("YYYY-MM-DD")
        }, ({ready, done, error, aborted}) => {
            // console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({defaultDate: now})
        });
    }

    onChangeDisplayType(type) {
        this.setState({calendarDisplayType: type})
    }

    render() {

        let date = this.state.defaultDate;
        let events = this.props.viewer.events.edges;

        return  <div className="calendar-container">

                    <CalendarHeader defaultDate={date}
                                    increaseCalendar={this.increaseCalendar.bind(this)}
                                    subtractCalendar={this.subtractCalendar.bind(this)}
                                    displayType={this.state.calendarDisplayType}
                                    onChangeDisplayType={this.onChangeDisplayType.bind(this)}
                                    getNow={this.getNow.bind(this)} />


                    <Calendar defaultDate={date}
                              events={events}
                              displayType={this.state.calendarDisplayType} />

                </div>
    }


}

export default Relay.createContainer(EventBox, {

    initialVariables: {date: null},

    prepareVariables: prevVariables => {

        console.log("prevVariables : " + JSON.stringify(prevVariables));
        
        
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
