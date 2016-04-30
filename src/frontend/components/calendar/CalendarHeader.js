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

        return  <div className="calendar-header">
                    <div className="row">
                        <div className="col-md-1 col-sm-1 col-xs-1 col-xs-offset-1">
                            <button className="btn btn-default" onClick={this.subtractCalendar.bind(this)}>
                                <i className="fa fa-2x fa-chevron-left"/>
                            </button>
                        </div>
                        <div className="center col-md-8 col-sm-8 col-xs-6">
                            <button className="btn btn-default" onClick={this.getNow.bind(this)}>Today</button>
                        </div>
                        <div className="col-md-1 col-sm-1 col-xs-1">
                            <button className="btn btn-default" onClick={this.increaseCalendar.bind(this)}><i className="fa fa-2x fa-chevron-right"/></button>
                        </div>
                    </div>
                </div>

    }


}

export default CalendarHeader