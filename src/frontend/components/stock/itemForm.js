import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import AutosuggestWrapper from '../utils/AutosuggestWrapper'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

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
            return {name: model.name}
        })

        var suggestionsDomains = domains.map(domain => {
            return {name: domain.name}
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
                suggestions.push({title: subCategory.category.name, suggestions: [{name: subCategory.name}]})

            } else {
                suggestions[index].suggestions.push({name: subCategory.name})
            }
        })

        console.log("built suggestions : " + JSON.stringify(suggestions))

        return suggestions

    }


    componentDidMount() {



        this.setState({suggestions: buildSuggestion, filteredSuggestions: buildSuggestion})
    }

    onSearchFieldChange(field) {

        var newItem = _.get(this.refs, field)
        console.log(field + " value: " + newItem.value)
    }





    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories
        var buildSuggestion = this.buildSuggestion(models, domains, subCategories);

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        var domainOptionList  = this.props.viewer.domains.map((elt) => {
            return <li className="inline" key={elt.id}>{elt.name}</li>
        })

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <form encType="multipart/form-data" method="post" className="form-horizontal" onSubmit={this.submitForm.bind(this)}>

                                <h3>Select your model</h3>
                                <AutosuggestWrapper suggestions={buildSuggestion} />
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
              brand {
                name
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
