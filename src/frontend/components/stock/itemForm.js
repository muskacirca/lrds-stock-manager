import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import AutosuggestWrapper from '../utils/AutosuggestWrapper'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemFeatures : {
                model: "",
                domains: [],
                categories: []
            }
        }
    }

    submitForm(e) {
        e.preventDefault()
    }

    onFieldChange(field, e) {
        var newItem = _.set(this.state.item, field, e.target.value)
        this.setState({item: newItem})
    }

    buildSuggestion(models, domains, subCategories) {

        var suggestionsModels = models.map(model => {
            return {name: model.name, section: "models"}
        })

        var suggestionsDomains = domains.map(domain => {
            return {name: domain.name, section: "domains"}
        })

        var suggestions = [
            {
                title: "Models",
                suggestions: suggestionsModels,
            },
            {
                title: "Domains",
                suggestions: suggestionsDomains
            }
        ]

        subCategories.map(subCategory => {
            var index = _.findIndex(suggestions, (o) =>  o.title == subCategory.category.name)
            if(index === -1) {
                suggestions.push({title: subCategory.category.name, suggestions: [{name: subCategory.name, section: subCategory.category.name}]})

            } else {
                suggestions[index].suggestions.push({name: subCategory.name, section: subCategory.category.name})
            }
        })

        return suggestions
    }

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        if(suggestion.section === "models") {

            existingItemFeature.model = suggestionValue

        } else if(suggestion.section === "domains") {

            var index = _.findIndex(existingItemFeature.domains, (o) => o.name == suggestion.name)
            if(index === -1) existingItemFeature.domains.push(suggestionValue)

            // A subCategory
        } else {

            var index = _.findIndex(existingItemFeature.categories, (o) =>  o.categoryName == suggestion.section)
            if(index === -1) {
                existingItemFeature.categories.push({categoryName: suggestion.section, subCategories: [{name: suggestion.name}]})

            } else {
                existingItemFeature.categories[index].suggestions.push({name: suggestion.name})
            }
        }

        return existingItemFeature
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
    }

    findModel(modelName) {
        if(modelName === "") return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models, (o) => o.name === modelName)
        return this.props.viewer.models[index]
    }


    renderItemDomains(createdDomains, modelDomains) {

        var itemCreatedDomains = createdDomains.map(elt => {
            return <li key={elt} className="tag">{elt}</li>
        })

        var modelDomains = modelDomains.map(elt => {
            return <li key={elt.name} className="model-tag">{elt.name}</li>
        })

        return _.concat(itemCreatedDomains, modelDomains)
    }

    renderItemSubCategories(createdSubCategories, modelSubCategories) {

        var itemCategories = createdSubCategories.map(elt => {
            return <li key={elt.categoryName} className="tag">{elt.categoryName}</li>
        })

        var modelSubCategories = modelSubCategories.map(elt => {
            return <li key={elt.name} className="model-tag">{elt.name}</li>
        })

        return _.concat(itemCategories, modelSubCategories)
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

    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories
        var builtSuggestion = this.buildSuggestion(models, domains, subCategories);

        var model = this.findModel(this.state.itemFeatures.model)

        var itemDomains = this.renderItemDomains(this.state.itemFeatures.domains, model.domains)
        var itemSubCategories = this.renderItemSubCategories(this.state.itemFeatures.categories, model.subCategories)

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        var stateIcon = this.computeStateIcon(this.state.itemFeatures.state)

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <h3>Select your model</h3>
                    <div className="row">
                        <div className="col-md-3">
                            <AutosuggestWrapper suggestions={builtSuggestion} onSuggestionSelected={this.onSuggestionSelected.bind(this)} />
                            <br />
                            <h3>Add State</h3>
                            <select className="form-control" onChange={this.onSelectStateChange.bind(this)}>
                                <option value="1">Neuf</option>
                                <option value="2">Bon état</option>
                                <option value="3">Le dernier souffle</option>
                                <option value="4">A réparer</option>
                            </select>
                        </div>

                        <div className="col-md-8">
                            <form encType="multipart/form-data" method="post" className="form-horizontal" onSubmit={this.submitForm.bind(this)}>

                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <div className="row">
                                            <div className="col-md-11">
                                                <h4><strong>{model.brand.name + ' - ' + model.name}</strong></h4>
                                            </div>
                                            <div className="col-md-1">
                                                {stateIcon}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <em>Domaine: </em>
                                                <ul>{itemDomains}</ul>
                                            </div>
                                            <div className="col-md-5">
                                                <em>Sous Catégories: </em>
                                                <ul>{itemSubCategories}</ul>
                                            </div>
                                        </div>
                                        <p>
                                            <em>{model.description}</em>
                                        </p>
                                    </div>
                                </div>

                            </form>
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
