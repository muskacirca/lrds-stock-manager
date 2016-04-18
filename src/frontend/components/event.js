import React from 'react'
import Relay from 'react-relay'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

class EventBox extends React.Component {

    constructor(props) {
        super(props)
        BigCalendar.setLocalizer(
            BigCalendar.momentLocalizer(moment)
        );
    }
    
  render() {
      
      var events = [
          {
              'title': 'All Day Event',
              'allDay': true,
              'start': new Date(2015, 3, 0),
              'end': new Date(2015, 3, 0)
          },
          {
              'title': 'Super event',
              'start': new Date(2016, 5, 10, 11, 0, 0),
              'end': new Date(2016, 5, 10, 14, 0, 0)
          },
          {
              'title': 'Long Event',
              'start': new Date(2015, 3, 7),
              'end': new Date(2015, 3, 10)
          },

          {
              'title': 'DTS STARTS',
              'start': new Date(2016, 2, 13, 0, 0, 0),
              'end': new Date(2016, 2, 20, 0, 0, 0)
          }]
      
    return (
        <div>
            Big calendar :
            <BigCalendar defaultDate={new Date(2015, 3, 1)} events={events}/>
        </div>
    )
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
