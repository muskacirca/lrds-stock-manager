import React from 'react'
import ReactDOM from 'react-dom'

class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    getSearch(cb) {
        cb = arguments[arguments.length - 1]
        var searchedText = this.state.searchedText
        if (cb) {
            if(searchedText.length > 3) cb(searchedText)
        }
    }

    handleSearch() {
        var searchedText = ReactDOM.findDOMNode(this.refs.searchInput).value
        this.props.onChange(searchedText);
    }

    render() {
        return  <div className="input-group">
                    <span className="input-group-addon glyphicon glyphicon-search" aria-hidden="true" id="basic-addon1" />
                    <input ref="searchInput" type="text" className="form-control" placeholder="Search" aria-describedby="basic-addon1" onChange={this.handleSearch.bind(this)}/>
                </div>
    }
}

export default SearchComponent
