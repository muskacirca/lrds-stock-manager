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


        var filteredSuggestions =  this.props.suggestionFilter(value, this.props.suggestions)
        return filteredSuggestions
    }

    onChange(event, { newValue, method }) {

        this.setState({
            value: newValue
        });

        if(this.props.onInputChange) this.props.onInputChange(newValue)
    }

    onSuggestionsUpdateRequested({ value }) {

        this.setState({
            filteredSuggestions: this.getSuggestions(value)
        });
    }

    onSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        if(this.props.resetInputValue) this.setState({value: ''});
        this.props.onSuggestionSelected(event, { suggestion, suggestionValue, method })
    }

    render() {

        const { value } = this.state;
        const { inputText, inputId } = this.props
        const inputProps = {
            placeholder: inputText,
            value,
            onChange: this.onChange.bind(this),
            className: "form-control",
            id: inputId
        };

        return  <Autosuggest multiSection={this.props.multiSection}
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
