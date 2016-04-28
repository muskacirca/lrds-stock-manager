import React from 'react'
import Relay from 'react-relay'

import Calendar from './../calendar/Calendar'

class EventBox extends React.Component {

    constructor(props) {
        super(props)
      
    }

    render() {

        return  <div className="calendar-container">
                    <div className="col-md-10 col-md-offset-1">
                        <Calendar defaultDate={new Date()} />
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
