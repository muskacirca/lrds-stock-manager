import React from 'react'
import Relay from 'react-relay'
import DatePicker from 'react-datepicker'

import FormHeader from '../../utils/forms/FormHeader'

import AddEventMutation from '../../../mutations/AddEventMutation'
import UserService from '../../utils/AuthService'

class EventAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            alert: undefined
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

    resetForm() {

        this.refs.inputFormEventName.value = ""
        this.refs.inputFormEventDescription.value = ""
        this.setState({startDate: null, endDate: null})
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

        var onSuccess = (response) => {
            this.updateAlert("Event added successfully", "success");
            this.resetForm()
        }

        var onFailure = (transaction) => this.updateAlert("An error occurred when adding new event", "error");
        
        Relay.Store.commitUpdate(addEventutation, {onSuccess, onFailure})
    }
    
    updateAlert(message, type) {
        var alert = {message: message, type: type}
        this.setState({alert: alert})
    }
    
    render() {

        return  <form className="form-horizontal" name="addNewEventForm">
            
                    <FormHeader title="Create an event"
                                alert={this.state.alert}
                                onSave={this.onAddEvent.bind(this)} />
            
                    <div className="page-content row">
                        <div className="col-md-10 col-md-offset-1">                            
                                <div className="form-group">
                                    <label htmlFor="inputFormEventName" className="col-md-1 control-label">Event name</label>
                                    <div className="col-md-11">
                                        <input ref="inputFormEventName" id="inputFormEventName" type="text" className="form-control" placeholder="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEventDescription" className="col-md-1 control-label">Event description</label>
                                    <div className="col-md-11">
                                        <textarea ref="inputFormEventDescription" id="inputFormEventDescription" className="form-control" rows="5" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormStartDate" className="col-md-1 control-label">Start date</label>
                                    <div className="col-md-11">
                                        <DatePicker id="inputFormStartDate" ref="inputFormStartDate" className="form-control"
                                                    dateFormat="DD/MM/YYYY" selected={this.state.startDate} 
                                                    onChange={this.handleChange.bind(this, "inputFormStartDate")} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEndDate" className="col-md-1 control-label">End date</label>
                                    <div className="col-md-11">
                                        <DatePicker id="inputFormEndDate" ref="inputFormEndDate" className="form-control"
                                                    dateFormat="DD/MM/YYYY" selected={this.state.endDate}
                                                    onChange={this.handleChange.bind(this, "inputFormEndDate")} />
                                    </div>
                                </div>
                                <div className="form-group">

                                </div>
                        </div>
                    </div>
                </form>
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
