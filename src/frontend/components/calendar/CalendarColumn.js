import React from 'react'
import moment from 'moment'
import slice from 'lodash/slice'
import concat from 'lodash/concat'
import classnames from 'classnames'

import {
    computeFreeTime
} from './utils/CalendarUtils'

import {
    Link
} from 'react-router'

class CalendarColumn extends React.Component {

    constructor(props) {
        super(props)
    }

    renderEventsList(events) {

        let slicedArray = slice(events.map((event, key) => {
            return  <li key={"calendar-event-list-" + this.props.dayNumber + "-" + key}>
                        <Link to={"/event/" + event.node.id}>{event.node.name}</Link>
                    </li>
        }), 0, 3);

        return events.length > 3 ? concat(slicedArray, "...") : slicedArray
    }

    renderOccupation(events) {

        let freeTime = "";
        if(events) {
            freeTime = computeFreeTime(moment(), events);
        }
        return [<div key="freetime-">{freeTime}</div>]
    }

    handleEventBadgeClick() {

    }

    renderMoreButton() {
        return  <div className="mobile-hide calendar-event-plus-wrapper">
                    <div className="pointer calendar-event-plus"
                         onClick={this.handleEventBadgeClick.bind(this)}>
                        <i className="fa fa-plus-circle" aria-hidden="true"/>
                    </div>
                </div>
    }

    render() {

        let dayNumber = this.props.dayNumber;
        let now = moment();
        
        let events = this.renderEventsList(this.props.events);
        
        let labelClass = classnames({"calendar-days-tr-up": true}, 
                                    {"red": dayNumber == now.date()
                                                && this.props.defaultDate.month() == now.month()
                                                && this.props.defaultDate.year() == now.year()});


        let moreButton = this.props.events.length > 3 ? this.renderMoreButton() : null;

        return  <div className="calendar-row-content calendar-days">
                    <div className={labelClass}>
                        {this.props.label ? this.props.label + ' ' + dayNumber : dayNumber}
                    </div>
                    <div className="calendar-days-content">

                        <ul className="mobile-hide">{events}</ul>
                        {moreButton}
                        <div className="calendar-event-count-wrapper hidden-md hidden-sm hidden-lg">
                            <div className="pointer calendar-event-count"
                                onClick={this.handleEventBadgeClick.bind(this)}>
                                <span className="badge">{events.length > 0 ? events.length : null}</span>
                            </div>
                        </div>
                    </div>
                </div>
    }


}

CalendarColumn.propTypes = {
    label: React.PropTypes.string,
    displayType:  React.PropTypes.oneOf(['month', 'week'])
};

CalendarColumn.defaultProps = {
    displayType: "month"
};

export default CalendarColumn
