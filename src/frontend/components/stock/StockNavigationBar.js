import React from 'react'
import Relay from 'react-relay'

import ItemFormDisplay from './ItemDisplay'
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

    onSelectFilter(severity, e) {
        
        e.preventDefault()
        this.props.onEditFilterByState(severity)
    }

    renderFilterByState() {

        const states = [{name: "green", severity: "1"}, 
            {name: "yellow", severity: "2"}, 
            {name: "orange", severity: "3"}, 
            {name: "red", severity: "4"}]

            return states.map(state => {

                return  <buton key={"filter-buttons-" + state.name}
                               className="pointer filter-button" type="button"
                               onClick={this.onSelectFilter.bind(this, state.severity)}>
                    
                            <i className={"fa fa fa-square " + state.name} />
                        </buton>
            })
    }


    render() {

        var filterByState = this.renderFilterByState()

        var tagRow = this.props.tags.map(function(element, key) {
            return <li key={key} className="tag" onClick={this.onCLickTag.bind(this, element)}>{element}</li>
        }.bind(this))

        return  <div>
                    <div className="row">
                        <div className="col-md-12">
                            <SearchComponent from="stock"
                                         onChange={this.onSearchInputChange.bind(this)}
                                         onKeyDown={this.onKeyDownSearch.bind(this)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="navigation-sub-row col-md-6 col-sm-6 mobile-hide">
                           <div className="row">
                               <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Filter:</strong></div>
                               <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                   {filterByState}
                                   <buton key={"filter-buttons-clear"}
                                          className="pointer filter-button" type="button"
                                          onClick={this.onSelectFilter.bind(this, null)}>

                                       <i className="fa fa-times" aria-hidden="true" />
                                   </buton>
                               </div>
                           </div>
                        </div>
                        <div className="navigation-sub-row col-md-6 col-sm-6 col-xs-12">
                            <div className="row">
                                <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2"><strong>Tags:</strong></div>
                                <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                    <ul className="inline-ul">{tagRow}</ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
    }
}

export default StockNavigationBar
