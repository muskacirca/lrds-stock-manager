import React from 'react'
import ReactDOM from 'react-dom'

class SearchComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {searchedText: ""}
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
        this.setState({searchedText: searchedText}, e => {
            this.props.onChange(searchedText);
        })
    }

    handlePressEnter(e) {
        if(e.keyCode === 13){
            ReactDOM.findDOMNode(this.refs.searchInput).value = ''
            this.props.onKeyDown(this.state.searchedText);
        }
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        return  <div className="input-group">
                    <span className="input-group-addon glyphicon glyphicon-search" aria-hidden="true" id="basic-addon1" />
                    <input ref="searchInput"
                           type="text"
                           className="form-control"
                           placeholder="Search"
                           aria-describedby="basic-addon1"
                           onChange={this.handleSearch.bind(this)}
                           onKeyDown={this.handlePressEnter.bind(this)} />
                </div>
    }
}

export default SearchComponent
