import React from 'react'
import Relay from 'react-relay'
import DatePicker from 'react-datepicker'

class EventAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date()
        }
    }

    handleChange() {

    }

    onAddEvent() {
        
    }

    render() {

        return  <div>
                    <div className="sub-bar-component">
                        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
                            Hello sub-bar component
                        </div>
                    </div>
                    <form name="addNewEventForm">
                        <div className="form-group">
                            <label htmlFor="inputFormEventName">Event name</label>
                            <input ref="inputFormEventName" id="inputFormEventName" type="text" className="form-control" placeholder="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputFormEventDescription">Event description</label>
                            <textarea ref="inputFormEventDescription" id="inputFormEventDescription" className="form-control" rows="5" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputFormStartDate">Start date</label>
                            <DatePicker id="inputFormStartDate" dateFormat="DD/MM/YYYY"
                                        onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputFormEndDate">End date</label>
                            <DatePicker id="inputFormEndDate" dateFormat="DD/MM/YYYY"
                                        onChange={this.handleChange.bind(this)} />
                        </div>
                        <button className="btn btn-primary" type="submit" onClick={this.onAddEvent.bind(this)}>Submit</button>
                    </form>
                </div>
    }


}

export default Relay.createContainer(EventAdmin, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    }
})
