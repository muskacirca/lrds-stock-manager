import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import AutosuggestWrapper from '../../utils/AutosuggestWrapper'

import ItemFormDisplay from './itemFormDisplay'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemFeatures : {}
        }
    }

    onFieldChange(field, e) {
        var newItem = _.set(this.state.item, field, e.target.value)
        this.setState({item: newItem})
    }

    buildModelSuggestion(models) {

        var suggestions = []

        models.map(model => {

            var modelSuggestion = {name: model.name, section: model.brand.name}

            var index = _.findIndex(suggestions, (o) => o.title == model.brand.name)
            if(index === -1) {
                suggestions.push({title: model.brand.name, suggestions: [modelSuggestion]})
            } else {
                suggestions[index].suggestions.push(modelSuggestion)
            }
        })

        console.log("built suggestion : " + JSON.stringify(suggestions))

        return suggestions
    }

    buildBrandSuggestion(brands) {

        var suggestions = brands.map(brand => {
                return {name: brand.name}
        })

        console.log("built brand suggestion : " + JSON.stringify(suggestions))

        return suggestions
    }

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        _.set(existingItemFeature, "model", suggestionValue)
        return existingItemFeature
    }

    onModelSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
    }

    onBrandSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        console.log("brand suggestion value: " + suggestionValue)

    }

    findModel(modelName) {
        if(modelName === undefined) return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models, (o) => o.name === modelName)
        return this.props.viewer.models[index]
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
    }

    brandSuggestionFilter(value, suggestions) {

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return suggestions.filter(suggest => {
            return suggest.name.toLowerCase().indexOf(value) != -1
        })
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

        console.log("filtered suggestions: " + JSON.stringify(filteredSuggestion) )

        return filteredSuggestion.filter(elt => elt.suggestions.length !== 0)
    }

    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var brands = this.props.viewer.brands
        var subCategories = this.props.viewer.subCategories

        var builtModelSuggestion = this.buildModelSuggestion(models);
        var builtBrandSuggestion = this.buildBrandSuggestion(brands);

        var model = this.findModel(this.state.itemFeatures.model)

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        var stateIcon = this.computeStateIcon(this.state.itemFeatures.state)

        var itemFormDisplay = this.state.itemFeatures.model !== undefined ?
            <ItemFormDisplay model={model} stateIcon={stateIcon}/> : ""

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <h3>Select your model</h3>
                    <div className="row">
                        <div className="col-md-3">
                            <AutosuggestWrapper inputText="Select a model ..." suggestions={builtModelSuggestion}
                                                multiSection={true} suggestionFilter={this.modelSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onModelSuggestionSelected.bind(this)} />
                            <br />
                            <h4>or create one ...</h4>
                            <AutosuggestWrapper inputText="Select a brand ..." suggestions={builtBrandSuggestion}
                                                multiSection={false} suggestionFilter={this.brandSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onBrandSuggestionSelected.bind(this)} />



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
                </div>
    }
}

export default Relay.createContainer(ItemFormComponent, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            models {
              id
              name
      		  description
              brand {
                name
              }
              domains {
                id
                name,
                description
              }
              subCategories {
                name
                description
                category {
                  name,
                  description
                }
              }
            }
            domains {
              id
              name
            }
            brands {
              id
              name
            }
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
