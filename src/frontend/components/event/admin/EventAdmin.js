import React from 'react'
import Relay from 'react-relay'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import AddEventMutation from '../../../mutations/AddEventMutation'
import UserService from '../../utils/AuthService'

class EventAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment(),
            endDate: moment()
        }
    }

    handleChange(fieldRef, date) {

        
        if(fieldRef.indexOf("Start") != -1) {
            console.log("changind start date: ")
            this.setState({startDate: date})
        } else {

            console.log("chanbging end date")

            this.setState({endDate : date})
        }
    }

    onAddEvent(e) {

        e.preventDefault()

        var eventName =  this.refs.inputFormEventName.value
        var eventDescription =  this.refs.inputFormEventDescription.value
        var eventStartDate =  this.state.startDate
        var eventEndDate =  this.state.endDate

        var addEventutation = new AddEventMutation({
            viewer: this.props.viewer,
            userId: UserService.getUserId(),
            name: eventName,
            description: eventDescription,
            startDate: eventStartDate,
            endDate: eventEndDate,
            reservedItems: this.props.viewer.cart.selectedItems
        });

        var onSuccess = (response) => console.log(response);

        var onFailure = (transaction) => console.log(transaction);

        Relay.Store.commitUpdate(addEventutation, {onSuccess, onFailure})
        
    }

    render() {

        return  <div>
                    <div className="sub-bar row">
                        <div className="col-md-8 col-md-offset-2">
                            <h1>Create an event</h1>
                        </div>
                    </div>
                    <div className="page-content row">
                        <div className="col-md-10 col-md-offset-1">
                            <form className="form-horizontal" name="addNewEventForm">
                                <div className="form-group">
                                    <label htmlFor="inputFormEventName" className="col-sm-2 control-label">Event name</label>
                                    <div className="col-sm-8">
                                        <input ref="inputFormEventName" id="inputFormEventName" type="text" className="form-control" placeholder="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEventDescription" className="col-sm-2 control-label">Event description</label>
                                    <div className="col-sm-8">
                                        <textarea ref="inputFormEventDescription" id="inputFormEventDescription" className="form-control" rows="5" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormStartDate" className="col-sm-2 control-label">Start date</label>
                                    <div className="col-sm-8">
                                        <DatePicker id="inputFormStartDate" ref="inputFormStartDate" className="form-control"
                                                    dateFormat="DD/MM/YYYY" selected={this.state.startDate} 
                                                    onChange={this.handleChange.bind(this, "inputFormStartDate")} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEndDate" className="col-sm-2 control-label">End date</label>
                                    <div className="col-sm-8">
                                        <DatePicker id="inputFormEndDate" ref="inputFormEndDate" className="form-control"
                                                    dateFormat="DD/MM/YYYY" selected={this.state.endDate}
                                                    onChange={this.handleChange.bind(this, "inputFormEndDate")} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary" type="submit" onClick={this.onAddEvent.bind(this)}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
    }


}

export default Relay.createContainer(EventAdmin, {

    initialVariables: {viewerId: null},

    prepareVariables: prevVariables => {
        return {
            ...prevVariables,
            viewerId: UserService.getUserId() + "",
        };
    },
    
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            ${AddEventMutation.getFragment('viewer')}
            cart {
                selectedItems {
                    reference
                }
            }
            events(first: 100) {
                edges {
                    node {
                        name
                    }
                } 
            }
          }
        `
    }
})
