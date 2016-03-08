import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import AutosuggestWrapper from '../../utils/AutosuggestWrapper'

import AddModelMutation from '../../../mutations/AddModelMutation'
import AddItemMutation from '../../../mutations/AddItemMutation'

import ModelQuickForm from './modelQuickForm'
import ItemFormDisplay from './itemFormDisplay'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemFeatures : {modelName: ""},
            status: ""
        }
    }

    onFieldChange(field, e) {
        var newItem = _.set(this.state.item, field, e.target.value)
        this.setState({item: newItem})
    }

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

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        _.set(existingItemFeature, "modelName", suggestionValue)
        return existingItemFeature
    }

    onModelSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
    }

    findModelAndBindNewFeatures(itemFeatures) {
        if(itemFeatures.modelName === "") return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models.edges, (o) => o.node.name === itemFeatures.modelName)
        var model = this.props.viewer.models.edges[index].node

        var newDomains = _.unionWith(model.domains, itemFeatures.domains, (a, b) => a === b)
        _.set(model, "domains", newDomains)

        return model
    }

    onSelectStateChange(event) {

        console.log("state value : " + event.target.value)
        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        _.set(itemFeatures, "state", event.target.value)

        this.setState({itemFeatures: itemFeatures})
    }

    computeStateIcon(state) {

        if(state == "1") {
            return  <i className="fa fa-2x fa-thumbs-up green" />
        } else if(state == "2") {
            return  <i className="fa fa-2x fa-thumbs-up yellow" />
        } else if(state == "3") {
            return  <i className="fa fa-2x fa-thumbs-down orange" />
        } else if(state == "4") {
            return  <i className="fa fa-2x fa-thumbs-down red" />
        }
    }

    onFormSubmit() {

        console.log("submitting itemFeatures: " + JSON.stringify(this.state.itemFeatures))

        var domainsToAdd = this.state.itemFeatures.domains.map(elt => elt.name)
        console.log("about to add domains : " + JSON.stringify(domainsToAdd))


        var addItemMutation = new AddItemMutation({modelName: this.state.itemFeatures.modelName,
            state: this.state.itemFeatures.state,
            domains: domainsToAdd,
            viewer: this.props.viewer});

        var onSuccess = (response) => {
            console.log('Mutation successful! ' + JSON.stringify(response));
            this.setState({status: "Item add successfully"})
        };
        var onFailure = (transaction) => {
            var error = transaction.getError() || new Error('Mutation failed.');
            console.error(error);
        };

        Relay.Store.commitUpdate(addItemMutation, {onSuccess, onFailure})
    }

    modelSuggestionFilter(value, suggestions) {

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

    onAddNewModel(modelName, brandName) {

        var addModelMutation = new AddModelMutation({modelName: modelName, brandName: brandName, viewer: this.props.viewer});

        var onSuccess = (response) => {
            console.log('Mutation successful! ' + JSON.stringify(response));
            this.setState({itemFeatures: {modelName: response.addModel.modelEdge.node.name}, status: "Model add successfully"});
        };

        var onFailure = (transaction) => {
            var error = transaction.getError() || new Error('Mutation failed.');
            console.error(error);
            this.setState({status: "Mutation failed"})
        };

        Relay.Store.commitUpdate(addModelMutation, {onSuccess, onFailure})
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
        itemFeatures.domains === undefined
            ? _.set(itemFeatures, "domains", [{name: suggestionValue}])
            : itemFeatures.domains.push({name: suggestionValue})

        console.log("new itemItemFeatures after addDomain : " + JSON.stringify(itemFeatures))

        this.setState({itemFeatures: itemFeatures})
    }


    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories

        var builtModelSuggestion = this.buildModelSuggestion(models);
        var builtDomainSuggestion = this.buildDomainSuggestion(domains);

        var model = this.findModelAndBindNewFeatures(this.state.itemFeatures)

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        var stateIcon = this.computeStateIcon(this.state.itemFeatures.state)

        var itemFormDisplay = this.state.itemFeatures.modelName !== "" ?
            <ItemFormDisplay model={model} stateIcon={stateIcon}/> : ""

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <h3>Select your model</h3>
                    <div className="row">
                        <div className="col-md-3">
                            <AutosuggestWrapper inputText="Select a model ..." suggestions={builtModelSuggestion}
                                                multiSection={true} suggestionFilter={this.modelSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onModelSuggestionSelected.bind(this)}
                                                resetInputValue={true} ref="inputFormSearchModel"/>
                            <br />
                            <h5>or create one ...</h5>
                            <ModelQuickForm viewer={this.props.viewer} onAddNewModel={this.onAddNewModel.bind(this)} />
                            <br />

                            <h3>Add State</h3>
                            <select className="form-control" onChange={this.onSelectStateChange.bind(this)}>

                                <option>Select a state ...</option>
                                <option value="1">Neuf</option>
                                <option value="2">Bon état</option>
                                <option value="3">Le dernier souffle</option>
                                <option value="4">A réparer</option>
                            </select>

                            <h3>Add Domain</h3>
                            <AutosuggestWrapper inputText="Select a domain ..." suggestions={builtDomainSuggestion}
                                                multiSection={false} suggestionFilter={this.domainSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onDomainSuggestionSelected.bind(this)}
                                                resetInputValue={true} ref="inputFormSearchDomain"/>
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
                    <div>
                        status : {this.state.status}
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
