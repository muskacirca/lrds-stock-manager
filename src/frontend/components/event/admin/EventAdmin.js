import React from 'react'
import Relay from 'react-relay'

import SingleDatePickerWrapper from 'react-datetime'

import FormHeader from '../../utils/forms/FormHeader'
import AutosuggestWrapper from '../../utils/AutosuggestWrapper'

import AddEventMutation from '../../../mutations/AddEventMutation'
import UserService from '../../utils/AuthService'

class EventAdmin extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: null,
            endDate: null,
            alert: undefined,
            selectedItems: this.props.viewer.cart.selectedItems
        }
    }

    handleChange(fieldRef, date) {


        if(fieldRef.indexOf("Start") != -1) {
            this.setState({startDate: date})
        } else {
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


        var computedReservedItems = this.computeReservedItemds(this.state.selectedItems)

        var addEventMutation = new AddEventMutation({
            viewer: this.props.viewer,
            userId: UserService.getUserId(),
            name: eventName,
            description: eventDescription,
            startDate: eventStartDate,
            endDate: eventEndDate,
            reservedItems: computedReservedItems
        });

        var onSuccess = (response) => {
            this.updateAlert("Event added successfully", "success");
            this.resetForm()
        }

        var onFailure = (transaction) => this.updateAlert("An error occurred when adding new event", "error");

        Relay.Store.commitUpdate(addEventMutation, {onSuccess, onFailure})
    }

    computeReservedItemds(items)  {
        return items.map(item => item.reference)
    }

    updateAlert(message, type) {
        var alert = {message: message, type: type}
        this.setState({alert: alert})
    }

    renderReservedItems() {
        return this.state.selectedItems.map(item => {
            return <li className="list-group-item" key={"event-reserved-items-" + item.reference}>{item.reference}</li>
        })
    }

    buildItemsSuggestion(items) {
        return items.map(item => {
            return {name: item.node.reference}
        })
    }


    itemSuggestionFilter(value, suggestions) {
        const inputValue = value.trim().toLowerCase();

        return suggestions.filter(suggest => {
            return suggest.name.toLowerCase().indexOf(inputValue) != -1
        })
    }

    onItemSuggestionSelected(event, { suggestion, suggestionValue, method }) {
        let reservedItems = this.state.selectedItems;
        reservedItems.push({reference: suggestionValue})
        this.setState({selectedItems: reservedItems})
    }

    render() {

        let reservedItems = this.renderReservedItems();

        let itemSuggestion = this.buildItemsSuggestion(this.props.viewer.items.edges);

        return  <form className="form-horizontal" name="addNewEventForm">

                    <FormHeader title="Create an event"
                                alert={this.state.alert}
                                onSave={this.onAddEvent.bind(this)} />

                    <div className="page-content row">
                        <div className="col-md-6 col-md-offset-1">
                                <div className="form-group">
                                    <label htmlFor="inputFormEventName" className="col-md-3 control-label">name</label>
                                    <div className="col-md-9">
                                        <input ref="inputFormEventName" id="inputFormEventName" type="text" className="form-control" placeholder="name" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEventDescription" className="col-md-3 control-label">description</label>
                                    <div className="col-md-9">
                                        <textarea ref="inputFormEventDescription" id="inputFormEventDescription" className="form-control" rows="5" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormStartDate" className="col-md-3 control-label">Start date</label>
                                    <div className="col-md-9">
                                        <SingleDatePickerWrapper
                                            placeholder="end date"
                                            onChange={this.handleChange.bind(this, "inputFormStartDate")}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputFormEndDate" className="col-md-3 control-label">End date</label>
                                    <div className="col-md-9">
                                        <SingleDatePickerWrapper
                                            placeholder="end date"
                                            onChange={this.handleChange.bind(this, "inputFormEndDate")} 
                                        />

                                    </div>
                                </div>
                                <div className="form-group">

                                </div>
                        </div>
                        <div className="col-md-4">
                            <AutosuggestWrapper
                                inputText="Select an item ..." suggestions={itemSuggestion}
                                multiSection={false} suggestionFilter={this.itemSuggestionFilter.bind(this)}
                                onSuggestionSelected={this.onItemSuggestionSelected.bind(this)}
                                resetInputValue={true} ref="inputFormSearchDomain"/>

                            <h5>Selected items</h5>
                            <ul className="list-group">
                                {reservedItems}
                            </ul>
                        </div>
                    </div>
                </form>
    }


}

// TODO : weird to have to load events here
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
            items(first: 100) {
                edges {
                    node {
                        reference
                        model {
                            name
                            description
                            brand {
                                name
                            }
                        } 
                    }
                }
            }
          }
        `
    }
})
