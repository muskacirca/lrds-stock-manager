import React from 'react'
import SearchComponent from './sidebars/searchInput.js'

class ProductBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            searchedText: ""
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

    componentWillReceiveProps() {
    }

    componentWillUpdate() {

/*        var people = this.state.data.map(function(product, key) {

            console.log("searched text: " + this.state.searchedText)
            if (product.name.toLowerCase().contains(this.state.searchedText)) {
                return;
            } else {
                return <li className={person.sex} key={key}>{person.name}</li>;
            }
        });*/

    }

    componentDidUpdate() {
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2 sidebar">
                            <SearchComponent from="stock" onChange={this.onSearchInputChange.bind(this)}/>
                        </div>
                    </div>
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <ProductTable data={this.state.data} filterText={this.state.searchedText} />
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
        this.state = {productsRows: []}

    }

    componentWillReceiveProps() {

        console.log("componentWillReceiveProps")
    }

    componentWillUpdate() {
        console.log("componentWillUpdate")
    }

    componentDidUpdate() {
        console.log("componentDidUpdate")
    }

    render() {

        var counter = 0
        var filterText = this.props.filterText.toLowerCase()

        var rows = this.props.data.map(function (product, key) {

            if(filterText === "" ||  filterText.length <= 2 ) {
                if(counter < 250) {
                    counter += 1
                    return <ProductTableRow key={key} product={product} />
                }

            } else if(filterText.length > 2 && product.name.toLowerCase().contains(filterText))
                if(counter < 250) {
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
                    <th>Id</th>
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
                <tr>
                    <td>{this.props.product.id}</td>
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.isInStock}</td>
                </tr>
        )
    }
}

export default ProductBox
