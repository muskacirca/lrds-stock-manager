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

    buildSuggestion(models) {

        var suggestionsModels = models.map(model => {
            return {name: model.name, section: "models"}
        })

        return [{title: "Models", suggestions: suggestionsModels}]
    }

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        _.set(existingItemFeature, "model", suggestionValue)
        return existingItemFeature
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
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

    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories

        var builtSuggestion = this.buildSuggestion(models);

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
                            <AutosuggestWrapper inputText="Select a model ..." suggestions={builtSuggestion}
                                                onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
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
