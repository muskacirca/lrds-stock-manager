import React from 'react'
import moment from 'moment'

class CalendarHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment(this.props.defaultDate)
        }
    }

    increaseCalendar() {
        this.props.increaseCalendar()
    }

    subtractCalendar() {
        this.props.subtractCalendar()
    }

    getNow() {
        this.props.getNow()
    }
    
    componentWillReceiveProps(newprops) {
        this.setState({defaultDate: moment(newprops.defaultDate)})
    }

    goToAddEventPage() {
        this.context.router.push("/event/create")
    }

    render() {

        var date = moment(this.state.defaultDate).format("MMMM YYYY")

        return  <div className="sub-bar row">
                    <div className="col-md-5 col-md-offset-2 col-sm-6 col-xs-6 col-xs-offset-1">
                        <h2>{date}</h2>
                    </div>
                    <div className="center sub-bar-component-centered col-md-1 col-sm-4 col-xs-5">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-primary" onClick={this.goToAddEventPage.bind(this)}>Add Event</button>
                        </div>
                    </div>
                    <div className="sub-bar-component-centered col-md-2 col-sm-4 col-xs-5">
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-default" onClick={this.subtractCalendar.bind(this)}>
                                <i className="fa fa-chevron-left" />
                            </button>
                            <button type="button" className="btn btn-default" onClick={this.getNow.bind(this)}>Today</button>
                            <button type="button" className="btn btn-default" onClick={this.increaseCalendar.bind(this)}>
                                <i className="fa fa-chevron-right"/>
                            </button>
                        </div>
                    </div>
                   
                </div>

    }

// <div className="sub-bar-component-centered col-md-1 col-sm-2 col-xs-1">
//
// </div>
// <div className="sub-bar-component-centered col-md-1 col-sm-2 col-xs-1">
//
//     </div>


}

CalendarHeader.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default CalendarHeader