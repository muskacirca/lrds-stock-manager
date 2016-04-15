import React from 'react'
import Relay from 'react-relay'
import Link from 'react-router'

import StockTable from './StockTable'
import StockNavigationBar from './StockNavigationBar'

import AddItemInCartMutation from '../../mutations/AddItemInCartMutation'

class StockComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchedText: "",
            tags: []
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

    filterByTag(tags, rowsToFilter) {

        var counter = 0

        var taggedFilteredRows = []
        if (tags.length !== 0) {

            taggedFilteredRows = rowsToFilter.map(function (product) {

                if (counter < 35) {
                    var hasTags = false
                    for(var i = 0; i < tags.length; i++) {
                        if (product.node.model.name.toLowerCase().indexOf(tags[i].toLowerCase()) != -1) {
                            counter += 1
                            hasTags = true
                        }
                    }

                    return hasTags ? product : undefined
                }
            })
        }

        var filteredTags = taggedFilteredRows.filter(function (element) {
            return element !== undefined;
        })

        return filteredTags
    }

    filter(filterText, rowsRoFilter) {

        var counter = 0

        var rows = rowsRoFilter.map((product, key) => {

            if(counter < 35 ) {
                if (filterText === "" || filterText.length <= 1 ) {
                    counter += 1
                    return product.node

                } else if (filterText.length > 1 && product.node.model.name.toLowerCase().indexOf(filterText) != -1) {
                    counter += 1
                    return product.node
                }
            }
        })

        var goodRows = rows.filter(function (element) {
            return element !== undefined;
        })

        return goodRows
    }

    selectItem(reference) {
        this.context.router.push("/stock/" + reference)
    }

    addItemToCart(reference) {

        console.log("addIrmToCart : " + this.props.viewer.id)
        
        var addItemInCartMutation = new AddItemInCartMutation({
            viewerId: this.props.viewer.id,
            itemReference: reference,
            cart: this.props.viewer.cart
        });

        var onSuccess = (response) => console.log("Item added to cart");

        var onFailure = (transaction) => console.log("Item added to cart");

        Relay.Store.commitUpdate(addItemInCartMutation, {onSuccess, onFailure})
    }

    render() {

        var items = this.props.viewer.items.edges;
        var filterText = this.state.searchedText.toLowerCase()
        var filterTags = this.state.tags

        var tagFilteredData = this.filterByTag(filterTags, items)
        tagFilteredData = tagFilteredData.length === 0 ? items : tagFilteredData

        var filteredItems = this.filter(filterText, tagFilteredData)

        return (
            <div>
                <div className="sub-bar row">
                    <div className="sub-bar-component">
                        <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
                            <StockNavigationBar onTagSelected={this.onTagSelected.bind(this)}
                                                onSearchInputChange={this.onSearchInputChange.bind(this)}
                                                onTagRemoval={this.onCLickTag.bind(this)}
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
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
             id
             cart(viewerId: "Vmlld2VyOg==") {
                ${AddItemInCartMutation.getFragment('cart')}
             }
             items(first: 100) {
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


