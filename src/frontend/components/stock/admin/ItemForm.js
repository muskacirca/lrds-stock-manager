import React from 'react'
import Relay from 'react-relay'
import _ from 'lodash'
import moment from 'moment'

import AutosuggestWrapper from '../../utils/AutosuggestWrapper'

import AddModelMutation from '../../../mutations/AddModelMutation'
import AddItemMutation from '../../../mutations/AddItemMutation'

import CommentComponent from '../../utils/forms/CommentComponent'
import ModelQuickForm from './ModelQuickForm'
import ItemFormDisplay from '../ItemDisplay'

import FormHeader from '../../utils/forms/FormHeader'

import UserService from '../../utils/AuthService'

class ItemFormComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            itemFeatures : {modelName: "", domains: [], subCategories: [], comments: []},
            alert: undefined,
            isModelFormOpened: false
        }
    }

    onFieldChange(field, e) {
        var newItem = _.set(this.state.item, field, e.target.value)
        this.setState({item: newItem})
    }

    buildSelectedItem(existingItemFeature, suggestion, suggestionValue) {

        _.set(existingItemFeature, "modelName", suggestionValue)
        _.set(existingItemFeature, "severity", undefined)
        return existingItemFeature
    }

    findModelAndBindNewFeatures(itemFeatures) {

        if(itemFeatures.modelName === "") return {brand: {}, domains: [], subCategories: []}
        var index = _.findIndex(this.props.viewer.models.edges, (o) => o.node.name === itemFeatures.modelName)
        console.log("index" + index)
        console.log("models" + index)
        var model = this.props.viewer.models.edges[index].node

        var newDomains = _.unionWith(model.domains, itemFeatures.domains, (a, b) => a === b)
        _.set(model, "domains", newDomains)

        var newSubCategories = _.unionWith(model.subCategories, itemFeatures.subCategories, (a, b) => a === b)
        _.set(model, "subCategories", newSubCategories)

        return model
    }

    onSelectStateChange(event) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        _.set(itemFeatures, "severity", event.target.value)

        this.setState({itemFeatures: itemFeatures})
    }

    onFormSubmit(e) {

        e.preventDefault()

        var domainsToAdd = this.state.itemFeatures.domains.map(elt => elt.name)
        var subCategoriesToAdd = this.state.itemFeatures.subCategories.map(elt => elt.name)
        var commentsToAdd = this.state.itemFeatures.comments.map(elt => elt.text)

        var addItemMutation = new AddItemMutation({
            modelName: this.state.itemFeatures.modelName,
            severity: this.state.itemFeatures.severity,
            domains: domainsToAdd,
            subCategories: subCategoriesToAdd,
            comments: commentsToAdd,
            author:  UserService.getLogin,
            viewer: this.props.viewer
        });

        var onSuccess = (response) => {
            this.updateAlert("Item added successfully !", "success");
        }

        var onFailure = (transaction) => this.updateAlert("An error occurred when adding new item", "error");

        Relay.Store.commitUpdate(addItemMutation, {onSuccess, onFailure})

        // TODO Re-initialize all components

    }

    updateAlert(message, type) {
        var alert = {message: message, type: type}
        this.setState({alert: alert})
    }

    onAddNewModel(modelName, brandName) {

        var addModelMutation = new AddModelMutation({modelName: modelName, brandName: brandName, viewer: this.props.viewer});

        var onSuccess = (response) => {

            this.updateAlert("Model added successfully !", "success");
            var itemFeatures = _.cloneDeep(this.state.itemFeatures)
            _.set(itemFeatures, "modelName", response.addModel.modelEdge.node.name)
            this.setState({itemFeatures: itemFeatures});
        };

        var onFailure = (transaction) => {
            this.updateAlert("An error occurred when adding new model", "error");
        };

        Relay.Store.commitUpdate(addModelMutation, {onSuccess, onFailure})
    }

    // FILTER //
    buildModelSuggestion(models) {

        let suggestions = []

        models.edges.map(modelNode => {

            let model = modelNode.node

            let modelSuggestion = {name: model.name, section: model.brand.name}

            let index = _.findIndex(suggestions, (o) => o.title == model.brand.name)
            if(index === -1) {
                suggestions.push({title: model.brand.name, suggestions: [modelSuggestion]})
            } else {

                suggestions[index].suggestions.push(modelSuggestion)
            }
        })

        return suggestions
    }

    onModelSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var clonedItemFeatures = _.cloneDeep(this.state.itemFeatures)
        var itemFeature = this.buildSelectedItem(clonedItemFeatures, suggestion, suggestionValue)

        this.setState({itemFeatures: itemFeature})
    }

    multiSectionSuggestionFilter(value, suggestions) {

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

    buildDomainSuggestion(domains) {
        var suggestions = domains.map(domain => {
            return {name: domain.name}
        })
        return suggestions
    }

    domainSuggestionFilter(value, suggestions) {

        const inputValue = value.trim().toLowerCase();

        return suggestions.filter(suggest => {
            return suggest.name.toLowerCase().indexOf(inputValue) != -1
        })
    }


    onDomainSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        itemFeatures.domains.length == 0
            ? _.set(itemFeatures, "domains", [{name: suggestionValue}])
            : itemFeatures.domains.push({name: suggestionValue})

        this.setState({itemFeatures: itemFeatures})
    }

    buildSubCategoriesSuggestion(subCategories) {

        var suggestions = []

        subCategories.map(subCategory => {

            var modelSuggestion = {name: subCategory.name, section: subCategory.category.name}

            var index = _.findIndex(suggestions, (o) => o.title == subCategory.category.name)
            if(index === -1) {
                suggestions.push({title: subCategory.category.name, suggestions: [modelSuggestion]})
            } else {
                suggestions[index].suggestions.push(modelSuggestion)
            }
        })

        return suggestions
    }

    onSubCategoriesSuggestionSelected(event, { suggestion, suggestionValue, method }) {

        var itemFeatures = _.cloneDeep(this.state.itemFeatures)
        itemFeatures.subCategories.length == 0
            ? _.set(itemFeatures, "subCategories", [{name: suggestionValue}])
            : itemFeatures.subCategories.push({name: suggestionValue})

        this.setState({itemFeatures: itemFeatures})
    }

    renderStateList(states) {
        return states.map((state, key) => {
            return <option key={"state-list-" + key} value={state.severity}>{state.name}</option>
        })
    }

    toggleModelCreationForm(e) {
        e.preventDefault()
        this.setState({isModelFormOpened: !this.state.isModelFormOpened})
    }

    handleCommentPublish(message) {

        var comment = {
            text: message,
            createdAt: moment(),
            author: UserService.getLogin()
        };

        var itemFeatures = _.cloneDeep(this.state.itemFeatures);
        itemFeatures.comments.length == 0
            ? _.set(itemFeatures, "comments", [comment])
            : itemFeatures.comments.push(comment);

        this.setState({itemFeatures : itemFeatures})
    }

    render() {

        var models = this.props.viewer.models
        var domains = this.props.viewer.domains
        var subCategories = this.props.viewer.subCategories

        var builtModelSuggestion = this.buildModelSuggestion(models);
        var builtDomainSuggestion = this.buildDomainSuggestion(domains);
        var builtSubCategoriesSuggestion = this.buildSubCategoriesSuggestion(subCategories);

        var model = this.findModelAndBindNewFeatures(this.state.itemFeatures)

        var stateList = this.renderStateList(this.props.viewer.states)

        var itemFormDisplay = this.state.itemFeatures.modelName !== ""
            ? <ItemFormDisplay item={{model: model, state: {severity: this.state.itemFeatures.severity}}} />
            : <ItemFormDisplay />


        return  <div className="form-horizontal">

                    <FormHeader title="Create an item"
                                alert={this.state.alert}
                                onSave={this.onFormSubmit.bind(this)} />

                    <div className="page-content row">
                        <div className="col-md-10 col-md-offset-1">
                            <div className="row">

                                <div className="col-md-6 col-sm-6 col-sm-push-6 col-md-push-6">
                                    {itemFormDisplay}
                                    <CommentComponent comments={this.state.itemFeatures.comments}
                                                      handleCommentPublish={this.handleCommentPublish.bind(this)} />
                                </div>

                                <div className="col-md-6 col-sm-6 col-md-pull-6 col-sm-pull-6">

                                    <div className="form-group">
                                        <label htmlFor="modelInputForm" className="col-md-3 control-label">Select your model</label>
                                        <div className="col-md-9">
                                            <AutosuggestWrapper id="modelInputForm"
                                                inputText="Select a model ..." suggestions={builtModelSuggestion}
                                                multiSection={true} suggestionFilter={this.multiSectionSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onModelSuggestionSelected.bind(this)}
                                                resetInputValue={true} ref="inputFormSearchModel" />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <a href="#" onClick={this.toggleModelCreationForm.bind(this)}>
                                            <label htmlFor="" className="pointer col-md-3 control-label">or create one</label>
                                        </a>
                                        <div className={"col-md-9" }>
                                            <div className={this.state.isModelFormOpened ? "" : " hide"}>
                                                <ModelQuickForm viewer={this.props.viewer}
                                                                onAddNewModel={this.onAddNewModel.bind(this)} />

                                            </div>
                                            <div className={!this.state.isModelFormOpened ? "" : " hide"}>...</div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="" className="col-md-3 control-label">Add a state</label>
                                        <div className="col-md-9">
                                            <select className="form-control" onChange={this.onSelectStateChange.bind(this)}>
                                                <option>Select a state ...</option>
                                                {stateList}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="" className="col-md-3 control-label">Add domains</label>
                                        <div className="col-md-9">
                                            <AutosuggestWrapper
                                                inputText="Select a domain ..." suggestions={builtDomainSuggestion}
                                                multiSection={false} suggestionFilter={this.domainSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onDomainSuggestionSelected.bind(this)}
                                                resetInputValue={true} ref="inputFormSearchDomain"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="" className="col-md-3 control-label">Add Categories</label>
                                        <div className="col-md-9">
                                            <AutosuggestWrapper
                                                inputText="Select a category ..." suggestions={builtSubCategoriesSuggestion}
                                                multiSection={true} suggestionFilter={this.multiSectionSuggestionFilter.bind(this)}
                                                onSuggestionSelected={this.onSubCategoriesSuggestionSelected.bind(this)}
                                                resetInputValue={true} ref="inputFormSearchSubCategories"/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
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
             items(first: 100) {
                edges {
                    node {
                        reference
                    }
                }
                        
            }
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
            states {
                id
                severity
                name
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
