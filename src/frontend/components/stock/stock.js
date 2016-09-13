import React from 'react'
import Relay from 'react-relay'

import UserService from '../utils/AuthService'

import StockTable from './StockTable'
import StockNavigationBar from './StockNavigationBar'

import AddItemInCartMutation from '../../mutations/AddItemInCartMutation'

import {
    filterByText,
    filterByTag
} from '../utils/filter/FilterFunctions'

class StockComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchedText: "",
            tags: [],
            stateFilter: null,
            filterByInStock: false
        }
    }

    onSearchInputChange(searchedText) {
        this.setState({searchedText: searchedText})
    }

    onTagSelected(newTag) {
        var t = this.state.tags.slice()
        t.push(newTag)
        this.setState({
            tags: t,
            searchedText: ''}, e => {})
    }

    onCLickTag(tagToRemove) {
        var tmpTag = this.state.tags
        var i = tmpTag.indexOf(tagToRemove)
        if(i !== -1) tmpTag.splice(i, 1);
        this.setState({ tags: tmpTag })
    }

    selectItem(reference) {
        this.context.router.push("/stock/" + reference)
    }

    addItemToCart(reference) {

        var addItemInCartMutation = new AddItemInCartMutation({
            viewerId: UserService.getUserId(),
            itemReference: reference,
            cart: this.props.viewer.cart
        });

        var onSuccess = (response) => console.log("Item added to cart");

        var onFailure = (transaction) => console.log("Item not added to cart");

        Relay.Store.commitUpdate(addItemInCartMutation, {onSuccess, onFailure})
    }

    onEditFilterByState(severity) {


        this.props.relay.setVariables({
            severity: severity
        }, ({ready, done, error, aborted}) => {
            // console.log("isLoading: " + !ready && !(done || error || aborted));
            this.setState({stateFilter: severity})
        });

    }

    filterByState(severity, items) {
        if(severity != null) {
            return items.filter(item => {
                return item.node.state.severity == severity
            })
        }

        return items
    }

    filterByInStock(items) {
        if(this.state.filterByInStock) {
            return items.filter(item => {
                return item.node.isInStock == true
            })
        }

        return items
    }

    toggleInStockFilter() {
        this.setState({filterByInStock: !this.state.filterByInStock})
    }

    render() {

        let items = this.props.viewer.items.edges;
        let filterText = this.state.searchedText.toLowerCase().replace(' ', "");
        let filterTags = this.state.tags;
        let filterByState = this.state.stateFilter;

        let inStockFilteredRows = this.filterByInStock(items);
        let stateFilteredRow = this.filterByState(filterByState, inStockFilteredRows);
        let tagFilteredData = filterByTag(filterTags, stateFilteredRow);
        let filteredItems = filterByText(filterText, tagFilteredData);

        return (
            <div>
                <div className="sub-bar row">
                    <div className="sub-bar-component">
                        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
                            <StockNavigationBar onTagSelected={this.onTagSelected.bind(this)}
                                                onSearchInputChange={this.onSearchInputChange.bind(this)}
                                                onTagRemoval={this.onCLickTag.bind(this)}
                                                onEditFilterByState={this.onEditFilterByState.bind(this)}
                                                toggleInStockFilter={this.toggleInStockFilter.bind(this)}
                                                tags={this.state.tags} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <StockTable data={filteredItems}
                                    handleSelectRow={this.selectItem.bind(this)}
                                    handleAddItemToCart={this.addItemToCart.bind(this)} />
                    </div>
                </div>
            </div>
        )
    }


}

StockComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default Relay.createContainer(StockComponent, {

    initialVariables: {severity: null},

    prepareVariables: prevVariables => {

        var severity = prevVariables.severity == null
            ? null
            : prevVariables.severity

        return {
            ...prevVariables,
            severity: severity,
        };
    },

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
             cart {
                ${AddItemInCartMutation.getFragment('cart')}
             }
             items(first: 100, severity: $severity) {
              edges {
                node {
                  reference,
                  isInStock,
                  state {
                    severity
                  },
                  model {
                    name
                    description
                    brand {
                      name
                      description
                    }
                    subCategories {
                      name
                      description
                    }
                    domains {
                      name
                      description
                    }
                  },
                  comments(first: 5) {
                    edges {
                      node {
                        text
                      }
                    }
                  }
                }
              }
            }
          }
        `
    }
});


