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

        console.log("built suggestions : " + JSON.stringify(suggestions))

        return suggestions

    }

    onSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        console.log("method: " + method)
        console.log("suggestion: " + JSON.stringify(suggestion))
        console.log("suggestionValue: " + suggestionValue)

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        if(suggestion.section === "models") {

            itemFeatures.model = suggestionValue

        } else if(suggestion.section === "domains") {

            var index = _.findIndex(itemFeatures.domains, (o) => o.name == suggestion.name)
            if(index === -1) itemFeatures.domains.push(suggestionValue)

            // A subCategory
        } else {

            var index = _.findIndex(itemFeatures.categories, (o) =>  o.categoryName == suggestion.section)
            if(index === -1) {
                itemFeatures.categories.push({categoryName: suggestion.section, subCategories: [{name: suggestion.name}]})

            } else {
                itemFeatures.categories[index].suggestions.push({name: suggestion.name})
            }
        }
        console.log("itemFeatures: " + JSON.stringify(itemFeatures))
        this.setState({itemFeatures: itemFeatures})

    }

    findModel(modelName) {
        if(modelName === "") return {brand: {}}
        var index = _.findIndex(this.props.viewer.models, (o) => o.name === modelName)
        return this.props.viewer.models[index]
    }



    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories
        var buildSuggestion = this.buildSuggestion(models, domains, subCategories);

        var itemDomain = this.state.itemFeatures.domains.map(elt => {
            console.log("element : " +  elt)
            return <div key={elt} className="tag">{elt}</div>
        })

        var itemCategories = this.state.itemFeatures.categories.map(elt => {
            console.log("element : " +  elt)
            return <div key={elt.categoryName} className="tag">{elt.categoryName}</div>
        })

        var model = this.findModel(this.state.itemFeatures.model)

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <br />
                    <div className="row">
                        <div className="col-md-3">
                            <form encType="multipart/form-data" method="post" className="form-horizontal" onSubmit={this.submitForm.bind(this)}>

                                <h3>Select your model</h3>
                                <AutosuggestWrapper suggestions={buildSuggestion} onSuggestionSelected={this.onSuggestionSelected.bind(this)} />

                            </form>
                        </div>
                        <div className="col-md-7">
                            <form encType="multipart/form-data" method="post" className="form-horizontal" onSubmit={this.submitForm.bind(this)}>

                                <div className="panel panel-default">
                                    <div className="panel-heading">{model.brand.name + ' - ' + model.name}</div>
                                    <div className="panel-body">
                                        {model.description}
                                    </div>
                                </div>
                                {itemDomain}
                                {itemCategories}
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
        `
    }
});
