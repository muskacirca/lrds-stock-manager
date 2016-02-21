import React from 'react'
import Autosuggest from 'react-autosuggest'
import _ from 'lodash'

class AutosuggestWrapper extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            filteredSuggestions: [],
            value: ''
        }
    }

    componentDidMount() {
        this.setState({filteredSuggestions: this.props.suggestions})
    }

    getSuggestionValue(suggestion) {
        return suggestion.name
    }

    renderSectionTitle(section) {
        return  <div>
                    <div className="row">
                        <div className="col-md-9">
                            <strong>{section.title}</strong>
                        </div>
                        <div className="col-md-1 pointer">
                            <i className="fa fa-plus-circle"></i>
                        </div>
                    </div>
               </div>
    }

    renderSuggestion(suggestion) {
        return <span>{suggestion.name}</span>
    }

    getSectionSuggestions(section) {
        return section.suggestions
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        var suggestions = _.cloneDeep(this.props.suggestions)

        var filteredSuggestion = inputLength === 0 ? [] : suggestions.map(suggestion => {

            var itemFiltered = suggestion.suggestions.filter(suggest => {
                return suggest.name.toLowerCase().indexOf(inputValue) != -1
            })

            suggestion.suggestions = itemFiltered
            return suggestion
        });

        return filteredSuggestion.filter(elt => elt.suggestions.length !== 0)
    }

    onChange(event, { newValue, method }) {

        // ArrowDown
        this.setState({
            value: newValue
        });
    }

    onSuggestionsUpdateRequested({ value }) {


        this.setState({
            filteredSuggestions: this.getSuggestions(value)
        });
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, method }) {
        this.setState({
            value: ''
        });

        this.props.onSuggestionSelected(event, { suggestion, suggestionValue, method })
    }

    render() {

        const { value } = this.state;
        const inputText = this.props.inputText
        const inputProps = {
            placeholder: inputText,
            value,
            onChange: this.onChange.bind(this),
            className: "form-control"
        };

        return  <Autosuggest multiSection={true}
                             suggestions={this.state.filteredSuggestions}
                             onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested.bind(this)}
                             getSuggestionValue={this.getSuggestionValue.bind(this)}
                             renderSectionTitle={this.renderSectionTitle.bind(this)}
                             renderSuggestion={this.renderSuggestion.bind(this)}
                             getSectionSuggestions={this.getSectionSuggestions.bind(this)}
                             onSuggestionSelected={this.onSuggestionSelected.bind(this)}
                             inputProps={inputProps} />

    }

}

export default AutosuggestWrapper
