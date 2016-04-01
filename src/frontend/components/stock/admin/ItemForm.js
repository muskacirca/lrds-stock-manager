import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import AutosuggestWrapper from '../../utils/AutosuggestWrapper'
import Expire from '../../utils/Expire'

import AddModelMutation from '../../../mutations/AddModelMutation'
import AddItemMutation from '../../../mutations/AddItemMutation'

import ModelQuickForm from './ModelQuickForm'
import ItemFormDisplay from '../ItemFormDisplay'



class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemFeatures : {modelName: "", domains: [], subCategories: []},
            alert: undefined
        }

    }

    onFieldChange(field, e) {
        var newItem = _.set(this.state.item, field, e.target.value)
        this.setState({item: newItem})
    }

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        _.set(existingItemFeature, "modelName", suggestionValue)
        _.set(existingItemFeature, "severity", undefined)
        console.log("buildSelectedItem: " + JSON.stringify(existingItemFeature))
        return existingItemFeature
    }

    findModelAndBindNewFeatures(itemFeatures) {

        if(itemFeatures.modelName === "") return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models.edges, (o) => o.node.name === itemFeatures.modelName)
        var model = this.props.viewer.models.edges[index].node

        var newDomains = _.unionWith(model.domains, itemFeatures.domains, (a, b) => a === b)
        _.set(model, "domains", newDomains)

        var newSubCategories = _.unionWith(model.subCategories, itemFeatures.subCategories, (a, b) => a === b)
        _.set(model, "subCategories", newSubCategories)

        return model
    }

    onSelectStateChange(event) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        _.set(itemFeatures, "severity", event.target.value)

        this.setState({itemFeatures: itemFeatures})
    }

    onFormSubmit() {

        console.log("submitting itemFeatures: " + JSON.stringify(this.state.itemFeatures))

        var domainsToAdd = this.state.itemFeatures.domains.map(elt => elt.name)
        console.log("about to add domains : " + JSON.stringify(domainsToAdd))

        var subCategoriesToAdd = this.state.itemFeatures.subCategories.map(elt => elt.name)
        console.log("about to add subCategories : " + JSON.stringify(subCategoriesToAdd))

        var addItemMutation = new AddItemMutation({
            modelName: this.state.itemFeatures.modelName,
            severity: this.state.itemFeatures.severity,
            domains: domainsToAdd,
            subCategories: subCategoriesToAdd,
            viewer: this.props.viewer});

        var onSuccess = (response) => this.updateAlert("Item added successfully !", "success");

        var onFailure = (transaction) => this.updateAlert("An error occurred when adding new item", "error");

        Relay.Store.commitUpdate(addItemMutation, {onSuccess, onFailure})

        // TODO Re-initialize all components

    }

    updateAlert(message, type) {
        console.log("updateAlert: " + message)
        var alert = {message: message, type: type}
        this.setState({alert: alert})
    }

    onAddNewModel(modelName, brandName) {

        var addModelMutation = new AddModelMutation({modelName: modelName, brandName: brandName, viewer: this.props.viewer});

        var onSuccess = (response) => {

            this.updateAlert("Model added successfully !", "success");
            var itemFeatures = _.cloneDeep(this.state.itemFeatures)
            _.set(itemFeatures, "modelName", response.addModel.modelEdge.node.name)
            this.setState({itemFeatures: itemFeatures});
        };

        var onFailure = (transaction) => {
            this.updateAlert("An error occurred when adding new model", "error");
        };

        Relay.Store.commitUpdate(addModelMutation, {onSuccess, onFailure})
    }

    // FILTER //
    buildModelSuggestion(models) {

        var suggestions = []

        models.edges.map(modelNode => {

            var model = modelNode.node

            var modelSuggestion = {name: model.name, section: model.brand.name}

            var index = _.findIndex(suggestions, (o) => o.title == model.brand.name)
            if(index === -1) {
                suggestions.push({title: model.brand.name, suggestions: [modelSuggestion]})
            } else {

                suggestions[index].suggestions.push(modelSuggestion)
            }
        })

        return suggestions
    }

    onModelSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
    }

    multiSectionSuggestionFilter(value, suggestions) {

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        var suggestions = _.cloneDeep(suggestions)

        var filteredSuggestion = inputLength === 0 ? [] : suggestions.map(suggestion => {

            var itemFiltered = suggestion.suggestions.filter(suggest => {
                return suggest.name.toLowerCase().indexOf(inputValue) != -1
            })

            suggestion.suggestions = itemFiltered
            return suggestion
        });
        return filteredSuggestion.filter(elt => elt.suggestions.length !== 0)
    }

    buildDomainSuggestion(domains) {
        var suggestions = domains.map(domain => {
            return {name: domain.name}
        })
        return suggestions
    }

    domainSuggestionFilter(value, suggestions) {

        const inputValue = value.trim().toLowerCase();

        return suggestions.filter(suggest => {
            return suggest.name.toLowerCase().indexOf(inputValue) != -1
        })
    }


    onDomainSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        itemFeatures.domains.length == 0
            ? _.set(itemFeatures, "domains", [{name: suggestionValue}])
            : itemFeatures.domains.push({name: suggestionValue})

        console.log("new itemItemFeatures after addDomain : " + JSON.stringify(itemFeatures))

        this.setState({itemFeatures: itemFeatures})
    }

    buildSubCategoriesSuggestion(subCategories) {

        var suggestions = []

        subCategories.map(subCategory => {

            var modelSuggestion = {name: subCategory.name, section: subCategory.category.name}

            var index = _.findIndex(suggestions, (o) => o.title == subCategory.category.name)
            if(index === -1) {
                suggestions.push({title: subCategory.category.name, suggestions: [modelSuggestion]})
            } else {
                suggestions[index].suggestions.push(modelSuggestion)
            }
        })

        return suggestions
    }

    onSubCategoriesSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        itemFeatures.subCategories.length == 0
            ? _.set(itemFeatures, "subCategories", [{name: suggestionValue}])
            : itemFeatures.subCategories.push({name: suggestionValue})

        console.log("new itemFeatures after addCategories : " + JSON.stringify(itemFeatures))

        this.setState({itemFeatures: itemFeatures})
    }

    onAlertDismiss() {
        this.setState({alert: undefined})
    }

    renderAlert() {

        if(this.state.alert !== undefined) {
            console.log("alert")

            var commonAlert = "alert "
            var alertType = this.state.alert.type == "success" ? "alert-success" : "alert-danger"

            return  <Expire delay={5000} callback={this.onAlertDismiss.bind(this)}>
                <div className={commonAlert + alertType} role="alert">
                    {this.state.alert.message}
                </div>
            </Expire>
        }
    }

    renderStateList(states) {
        return states.map((state, key) => {
            return <option key={"state-list-" + key} value={state.severity}>{state.name}</option>
        })
    }


    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories

        var builtModelSuggestion = this.buildModelSuggestion(models);
        var builtDomainSuggestion = this.buildDomainSuggestion(domains);
        var builtSubCategoriesSuggestion = this.buildSubCategoriesSuggestion(subCategories);

        var model = this.findModelAndBindNewFeatures(this.state.itemFeatures)

        var stateList = this.renderStateList(this.props.viewer.states)

        var alert = this.renderAlert()
        var pageTitle = "Create an item"

        var itemFormDisplay = this.state.itemFeatures.modelName !== "" ?
            <ItemFormDisplay item={{model: model, state: {severity: this.state.itemFeatures.severity}}} /> : ""


        return  <div className="col-md-10 col-md-offset-1">
            <h2>{pageTitle}</h2>
            {alert}
            <h3>Select your model</h3>
            <div className="row">
                <div className="col-md-3">
                    <AutosuggestWrapper inputText="Select a model ..." suggestions={builtModelSuggestion}
                                        multiSection={true} suggestionFilter={this.multiSectionSuggestionFilter.bind(this)}
                                        onSuggestionSelected={this.onModelSuggestionSelected.bind(this)}
                                        resetInputValue={true} ref="inputFormSearchModel"/>
                    <br />
                    <h5>or create one ...</h5>
                    <ModelQuickForm viewer={this.props.viewer} onAddNewModel={this.onAddNewModel.bind(this)} />
                    <br />

                    <h3>Add State</h3>
                    <select className="form-control" onChange={this.onSelectStateChange.bind(this)}>
                        <option>Select a state ...</option>
                        {stateList}
                    </select>

                    <h3>Add Domain</h3>
                    <AutosuggestWrapper inputText="Select a domain ..." suggestions={builtDomainSuggestion}
                                        multiSection={false} suggestionFilter={this.domainSuggestionFilter.bind(this)}
                                        onSuggestionSelected={this.onDomainSuggestionSelected.bind(this)}
                                        resetInputValue={true} ref="inputFormSearchDomain"/>

                    <h3>Add Categories</h3>
                    <AutosuggestWrapper inputText="Select a category ..." suggestions={builtSubCategoriesSuggestion}
                                        multiSection={true} suggestionFilter={this.multiSectionSuggestionFilter.bind(this)}
                                        onSuggestionSelected={this.onSubCategoriesSuggestionSelected.bind(this)}
                                        resetInputValue={true} ref="inputFormSearchSubCategories"/>
                </div>

                <div className="col-md-8">
                    {itemFormDisplay}
                </div>
            </div>

            <div className="row">
                <div className="col-md-1 col-md-offset-10">
                    <button className="btn btn-primary" onClick={this.onFormSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        </div>
    }
}

export default Relay.createContainer(ItemFormComponent, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            ${AddModelMutation.getFragment('viewer')}
            ${AddItemMutation.getFragment('viewer')}
            models(first: 100) {
                edges {
                    node {
                        name
                        brand {
                            name
                        }
                        domains {
                            name
                        }
                        subCategories {
                            name
                        }
                    }
                }

            }
            states {
                id
                severity
                name
            }
            domains {
              id
              name
            }
            ${ModelQuickForm.getFragment('viewer')}
            subCategories {
              name
              category {
                name
              }
            }
          }
        `
    }
});
