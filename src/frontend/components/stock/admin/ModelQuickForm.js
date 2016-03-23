import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'

import AutosuggestWrapper from '../../utils/AutosuggestWrapper'

class ModelQuickForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedBrand: ""
        }
    }

    buildBrandSuggestion(brands) {

        var suggestions = brands.map(brand => {
            return {name: brand.name}
        })
        return suggestions
    }

    brandSuggestionFilter(value, suggestions) {

        const inputValue = value.trim().toLowerCase();

        return suggestions.filter(suggest => {
            return suggest.name.toLowerCase().indexOf(inputValue) != -1
        })
    }

    onBrandSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        this.setState({selectedBrand: suggestionValue})
    }

    onBrandInputChange(newValue) {
        this.setState({selectedBrand: newValue})
    }

    onAddNewModel(e) {

        e.preventDefault()
        if(this.refs.inputFormNewModel.value != '') {
            var newModel = this.refs.inputFormNewModel.value
            this.refs.inputFormNewModel.value = ''
            this.props.onAddNewModel(newModel, this.state.selectedBrand)
        }
    }

    render() {

        var brands = this.props.viewer.brands
        var builtBrandSuggestion = this.buildBrandSuggestion(brands);

        return  <div>
                    <form name="addNewModelForm">
                        <AutosuggestWrapper inputText="Select a brand ..." suggestions={builtBrandSuggestion}
                                            multiSection={false} suggestionFilter={this.brandSuggestionFilter.bind(this)}
                                            onSuggestionSelected={this.onBrandSuggestionSelected.bind(this)}
                                            onInputChange={this.onBrandInputChange.bind(this)}
                                            resetInputValue={false} inputId="inputFormNewBrand"/>

                        <br />
                        <div className="row">
                            <div className="col-md-10">
                                <input ref="inputFormNewModel" type="text" className="form-control" placeholder="Enter a model ..." />
                            </div>
                            <div className="col-md-1">
                                <button className="btn btn-default" type="submit" onClick={this.onAddNewModel.bind(this)}>OK</button>
                            </div>
                        </div>
                    </form>
                </div>
    }

}

export default Relay.createContainer(ModelQuickForm, {

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            brands {
              id
              name
            }
          }
        `
    }
});
