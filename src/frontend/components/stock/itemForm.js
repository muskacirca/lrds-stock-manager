import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'

import Autosuggest from 'react-autosuggest'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            suggestions: [],
            filteredSuggestions: [],
            value: ''
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

        var suggestionsCategory = []

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
        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories

        var buildSuggestion = this.buildSuggestion(models, domains, subCategories);
        this.setState({suggestions: buildSuggestion, filteredSuggestions: buildSuggestion})
    }

    onSearchFieldChange(field) {

        var newItem = _.get(this.refs, field)
        console.log(field + " value: " + newItem.value)
    }


    getSuggestionValue(suggestion) {
        return suggestion.name;
    }

    renderSuggestion(suggestion) {

        if(suggestion){
        console.log("renderSugggestion : " + JSON.stringify(suggestion))

            var elt = suggestion.suggestions.map(elt => {
                return <span>{elt.name}</span>
            })

            return  <div>
                <h1>{suggestion.title}</h1>
                {elt}
            </div>
        }

    }


    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        console.log("this.state.suggestions in getSuggestions : " + JSON.stringify(this.state.suggestions))
        var suggestions = _.cloneDeep(this.state.suggestions)

        var filteredSuggestion = inputLength === 0 ? [] : suggestions.map(suggestion => {

            var itemFiltered = suggestion.suggestions.filter(suggest => {
                return suggest.name.toLowerCase().indexOf(inputValue) != -1
            })

            console.log("itemFiltered : " + JSON.stringify(itemFiltered))

            suggestion.suggestions = itemFiltered
            return suggestion
        });

        console.log("this.state.suggestions after getSuggestions : " + JSON.stringify(this.state.suggestions))
        console.log("filteredSuggestion 1 : " + JSON.stringify(filteredSuggestion))

        return filteredSuggestion
    }

    onChange(event, { newValue }) {

        this.setState({
            value: newValue
        });
    }

    onSuggestionsUpdateRequested({ value }) {
        this.setState({
            filteredSuggestions: this.getSuggestions(value)
        });
    }


    render() {

        const { value } = this.state;
        const inputProps = {
            placeholder: 'Type a model',
            value,
            onChange: this.onChange.bind(this)
        };

        var alerts = <div></div>
        var pageTitle = "Création d'un item"

        var domainOptionList  = this.props.viewer.domains.map((elt) => {
            return <li className="inline" key={elt.id}>{elt.name}</li>
        })

        console.log("suggestions in render: " + JSON.stringify(this.state.suggestions))
        console.log("filtered suggestions in render: " + JSON.stringify(this.state.filteredSuggestions))

        return  <div className="col-md-10 col-md-offset-1">
                    {alerts}
                    <h2>{pageTitle}</h2>
                    <br />
                    <div className="row">
                        <div className="col-md-6">
                            <form encType="multipart/form-data" method="post" className="form-horizontal" onSubmit={this.submitForm.bind(this)}>

                                <Autosuggest suggestions={this.state.filteredSuggestions}
                                             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                                             getSuggestionValue={this.getSuggestionValue.bind(this)}
                                             renderSuggestion={this.renderSuggestion.bind(this)}
                                             inputProps={inputProps} />

                                <h2>Domaine</h2>
                                <input ref="domainSearchField" type="text" onChange={this.onSearchFieldChange.bind(this, "domainSearchField")}/>
                                <ul>{domainOptionList}</ul>


                                <h2>Category</h2>
                                <input ref="categorySearchField" type="text" onChange={this.onSearchFieldChange.bind(this, "categorySearchField")}/>

                                <h2>Sous Catégorie</h2>
                                <input ref="subCategorySearchField" type="text" onChange={this.onSearchFieldChange.bind(this, "subCategorySearchField")}/>

                                <h2>Modèle</h2>
                                <input ref="modelSearchField" type="text" onChange={this.onSearchFieldChange.bind(this, "modelSearchField")}/>


                                <div className="form-group">
                                    <label htmlFor="referenceItemInput" className="col-md-2 control-label">Reference</label>
                                    <div className="col-md-10">
                                        <input id="referenceItemInput" ref="reference" className="form-control" placeholder="Reference"
                                               type="text" onChange={this.onFieldChange.bind(this, 'reference')}/>
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
