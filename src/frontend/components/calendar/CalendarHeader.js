import React from 'react'
import moment from 'moment'
import {
    Link
} from 'react-router'

class CalendarHeader extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            defaultDate: moment(this.props.defaultDate),
            displayType: this.props.displayType
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

        if(JSON.stringify(this.state.defaultDate) != JSON.stringify(newprops.defaultDate)
            || this.state.displayType != newprops.displayType) {

            this.setState({
                defaultDate: moment(newprops.defaultDate),
                displayType: newprops.displayType
            })
        }
    }

    onChangeDisplayType(type) {
        this.setState({displayType: type});
        this.props.onChangeDisplayType(type);
    }

    goToAddEventPage() {
        this.context.router.push("/admin/event/create")
    }

    render() {
        
        let dateFormat = this.state.displayType == "month" ? "MMMM YYYY" : "wo";
        let date = moment(this.state.defaultDate).format(dateFormat);

        date = this.state.displayType === "month" ? date : date + " week of the year";

        return  <div className="">
                    <div className="sub-bar">
                        <div className="col-md-5 col-md-offset-2 col-sm-6 col-xs-6">
                            <h3 className="calendar-title">{date}</h3>
                        </div>
                        <div className="mobile-hide center sub-bar-component-centered col-md-1 col-sm-2 col-xs-5">
                            <div id="authorize-div" className="btn-group" role="group">
                                <Link to="/admin/event/create">
                                    <button type="button" className="btn btn-primary">Add Event</button>
                                </Link>
                            </div>
                        </div>

                        <div className="center sub-bar-component-centered col-md-1 col-sm-3 col-xs-5">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-default" onClick={this.onChangeDisplayType.bind(this, "week")}>
                                    <i className="fa fa-calendar-o" aria-hidden="true" />
                                </button>
                                <button type="button" className="btn btn-default" onClick={this.onChangeDisplayType.bind(this, "month")}>
                                    <i className="fa fa-calendar" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="center sub-bar-component-centered col-md-2 col-sm-3 col-xs-5">
                            <div className="btn-group" role="group">
                                <button type="button" className="btn btn-default" onClick={this.subtractCalendar.bind(this)}>
                                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="btn btn-default" onClick={this.getNow.bind(this)}>Today</button>
                                <button type="button" className="btn btn-default" onClick={this.increaseCalendar.bind(this)}>
                                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>


    }
}

CalendarHeader.contextTypes = {
    router: React.PropTypes.object.isRequired
};

CalendarHeader.propTypes = {
    displayType:  React.PropTypes.oneOf(['month', 'week'])
};

CalendarHeader.defaultProps = {
    displayType: "month"
};



export default CalendarHeader
