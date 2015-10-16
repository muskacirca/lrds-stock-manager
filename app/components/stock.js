import React from 'react'
import SearchComponent from './sidebars/searchInput.js'
import Link from 'react-router'

class StockComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchedText: "",
            tags: []
        }
    }

    loadCommentsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data})
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        })
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    onSearchInputChange(searchedText) {
        this.setState({searchedText: searchedText})
    }

    onKeyDownSearch(searchedText) {
        var tags =   this.state.tags.push(searchedText)
        this.setState({tags: tags})
    }

    componentWillReceiveProps() {
    }

    componentWillUpdate() {

    }

    componentDidUpdate() {
    }

    render() {

        var tagRow = this.state.tags.map(function(tag) {
            return <div>tag</div>
        })

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2 sidebar">
                            <SearchComponent from="stock"
                                             onChange={this.onSearchInputChange.bind(this)}
                                             onKeyDown={this.onKeyDownSearch.bind(this)} />
                            <br />
                            <div className="col-sm-3 col-md-2">

                            </div>
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
                    <ProductTable data={this.state.data} filterText={this.state.searchedText} tags={this.state.tags} />
                </div>
            </div>
        )
    }
}

class ProductNavBar extends React.Component {

  render() {
      return <ul className="nav nav-pills">
              <li role="presentation" className="active"><a href="#">Add item</a></li>
              <li role="presentation"><a href="#">Edit item</a></li>
              <li role="presentation"><a href="#">Delete Item</a></li>
             </ul>
  }
}

class ProductTable extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        var counter = 0

        var filterText = this.props.filterText.toLowerCase()
        var filterTags = this.props.tags.toString().toLowerCase()

        var rows = this.props.data.map(function (product, key) {

            if((filterText === "" || filterText.length <= 2 ) && (filterTags === "" || product.name.toLowerCase().contains(filterTags)) ) {
                if(counter < 35) {
                    counter += 1
                    return <ProductTableRow key={key} product={product} />
                }

            } else if(filterText.length > 2
                && (product.name.toLowerCase().contains(filterText)
                || (filterTags === "" || product.name.toLowerCase().contains(filterTags))))

                if(counter < 35) {
                    counter += 1
                    return <ProductTableRow key={key} product={product} />
                }
        })

        console.log("render, productsRows length: " + rows.length)

        return (
            <table className="table">
                <ProductTableHeader />
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class ProductTableHeader extends React.Component {

    render() {
        return (
            <thead>
                <tr>
                    <th></th>
                    <th>Nom</th>
                    <th>En stock</th>
                </tr>
            </thead>
        )
    }
}

class ProductTableRow extends React.Component {
    render() {
            return (
                <tr onCLick="">
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.isInStock}</td>
                </tr>
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

export default StockComponent
