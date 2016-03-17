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

    onCLickTag(tagToremove) {
        var tmpTag = this.state.tags
        var i = tmpTag.indexOf(tagToremove)
        if(i !== -1) tmpTag.splice(i, 1);
        this.setState({ tags: tmpTag }, e => {})
    }

    render() {

        var tagRow = this.state.tags.map(function(element, key) {
            return <li key={key} className="tag" onClick={this.onCLickTag.bind(this, element)}>{element}</li>
        }.bind(this))

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2 sidebar">
                            <SearchComponent from="stock"
                                             onChange={this.onSearchInputChange.bind(this)}
                                             onKeyDown={this.onKeyDownSearch.bind(this)} />
                            <br />
                            <ul>
                                {tagRow}
                            </ul>
                            <div className="list-group">
                                <a className="list-group-item" href="#"><i className="fa fa-plus-circle fa-fw"></i>&nbsp; Add item</a>
                                <a className="list-group-item" href="#"><i className="fa fa-bookmark fa-fw"></i>&nbsp; Book item</a>
                                <a className="list-group-item" href="#"><i className="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
                                <a className="list-group-item" href="#"><i className="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <StockTable data={this.props.viewer.items.edges} filterText={this.state.searchedText} tags={this.state.tags} />
                </div>
            </div>
        )
    }
}

class TagBox extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        return (<div className="row">
                    <div className="col-sm-1">
                        <button className="btn btn-default"><i className="fa fa-pencil pointer"></i></button>
                    </div>
                </div>)
    }

}

export default Relay.createContainer(StockComponent, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            items(first: 100) {
              edges {
                node {
                  reference,
                  isInStock,
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


