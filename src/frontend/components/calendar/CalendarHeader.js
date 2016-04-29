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

    render() {

        return  <div className="calendar-container">
                    <div className="calendar-header">
                        <span className="calendar-month-year">{this.state.defaultDate.format("dddd, MMMM Do YYYY, h:mm:ss a")}</span>
                        <div className="row">
                            <div className="col-md-1">
                                <button className="btn btn-default" onClick={this.subtractCalendar.bind(this)}>
                                    <i className="fa fa-2x fa-chevron-left"/>
                                </button>
                            </div>
                            <div className="center col-md-10">
                                <button className="btn btn-default" onClick={this.getNow.bind(this)}>Today</button>
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-default" onClick={this.increaseCalendar.bind(this)}><i className="fa fa-2x fa-chevron-right"/></button>
                            </div>
                        </div>
                    </div>
                </div>
    }


}

export default CalendarHeader