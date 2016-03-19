/* @flow */

import React from 'react'
import Relay from 'react-relay'
import SearchComponent from '../sidebars/searchInput'
import Link from 'react-router'

import StockTable from './StockTable'

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

    onKeyDownSearch(searchedText) {
        var t = this.state.tags.slice()
        t.push(searchedText)
        this.setState({
            tags: t,
            searchedText: ''}, e => {})
    }

    onCLickTag(tagToRemove) {
        var tmpTag = this.state.tags
        var i = tmpTag.indexOf(tagToRemove)
        if(i !== -1) tmpTag.splice(i, 1);
        this.setState({ tags: tmpTag }, e => {})
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
        console.log("third: " + reference)
        this.context.router.push("/stock/" + reference)
    }

    render() {

        var tagRow = this.state.tags.map(function(element, key) {
            return <li key={key} className="tag" onClick={this.onCLickTag.bind(this, element)}>{element}</li>
        }.bind(this))

        var items = this.props.viewer.items.edges;
        var filterText = this.state.searchedText.toLowerCase()
        var filterTags = this.state.tags

        var tagFilteredData = this.filterByTag(filterTags, items)
        tagFilteredData = tagFilteredData.length === 0 ? items : tagFilteredData

        var filteredItems = this.filter(filterText, tagFilteredData)

        return (
            <div>
                <div className="row sub-bar">
                    <div className="col-md-8 col-md-offset-2 col-xs-10 col-xs-offset-1">
                        <div className="sub-bar-component">
                            <SearchComponent from="stock"
                                             onChange={this.onSearchInputChange.bind(this)}
                                             onKeyDown={this.onKeyDownSearch.bind(this)} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-md-offset-1">
                        <StockTable data={filteredItems} handleSelectRow={this.selectItem.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }


}

StockComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
}

//
//<div className="container-fluid">
//    <div className="row">
//        <div className="col-sm-3 col-md-2 sidebar">
//            <SearchComponent from="stock"
//                             onChange={this.onSearchInputChange.bind(this)}
//                             onKeyDown={this.onKeyDownSearch.bind(this)} />
//            <br />
//            <ul>
//                {tagRow}
//            </ul>
//            <div className="list-group">
//                <a className="list-group-item" href="#"><i className="fa fa-plus-circle fa-fw"></i>&nbsp; Add item</a>
//                <a className="list-group-item" href="#"><i className="fa fa-bookmark fa-fw"></i>&nbsp; Book item</a>
//                <a className="list-group-item" href="#"><i className="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
//                <a className="list-group-item" href="#"><i className="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
//            </div>
//        </div>
//
//    </div>
//</div>



export default Relay.createContainer(StockComponent, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
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


