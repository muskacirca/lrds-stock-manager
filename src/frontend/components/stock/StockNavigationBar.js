import React from 'react'
import Relay from 'react-relay'

import ItemFormDisplay from './itemFormDisplay'
import SearchComponent from '../sidebars/searchInput'

class StockNavigationBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onSearchInputChange(searchedText) {
            this.props.onSearchInputChange(searchedText);
    }

    onKeyDownSearch(newTag) {
        this.props.onTagSelected(newTag);
    }

    onCLickTag(tag) {
        this.props.onTagRemoval(tag)
    }


    render() {

        var tagRow = this.props.tags.map(function(element, key) {
            return <li key={key} className="tag" onClick={this.onCLickTag.bind(this, element)}>{element}</li>
        }.bind(this))

        return  <div className="">
                    <SearchComponent from="stock"
                                     onChange={this.onSearchInputChange.bind(this)}
                                     onKeyDown={this.onKeyDownSearch.bind(this)} />

                    <div className="navigation-sub-row">
                        <ul>{tagRow}</ul>
                    </div>
                </div>
    }
}

export default StockNavigationBar
