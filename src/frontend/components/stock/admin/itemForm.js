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
            itemFeatures : {modelName: ""}
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

    findModel(modelName) {
        if(modelName === "") return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models.edges, (o) => o.node.name === modelName)
        return this.props.viewer.models.edges[index].node
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

        Relay.Store.commitUpdate(
            new AddItemMutation({modelName: this.state.itemFeatures.modelName, state: this.state.itemFeatures.state, viewer: this.props.viewer})
        )
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

        Relay.Store.commitUpdate(
            new AddModelMutation({modelName: modelName, brandName: brandName, viewer: this.props.viewer})
        )
    }

    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains

        var subCategories = this.props.viewer.subCategories

        var builtModelSuggestion = this.buildModelSuggestion(models);


        var model = this.findModel(this.state.itemFeatures.modelName)

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
                        statius : {this.props.viewer.status}
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
