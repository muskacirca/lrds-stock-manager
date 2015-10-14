import React from 'react'

class ProductBox extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: []
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

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-md-2 sidebar">
                            Side bar STOCK
                        </div>
                    </div>
                </div>
                <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <ProductTable data={this.state.data}/>
                </div>
            </div>
        )
    }
}

class ProductNavBar extends React.Component {

  render() {
      return (<ul className="nav nav-pills">
              <li role="presentation" className="active"><a href="#">Add item</a></li>
              <li role="presentation"><a href="#">Edit item</a></li>
              <li role="presentation"><a href="#">Delete Item</a></li>
             </ul>)
  }
}

class ProductTable extends React.Component {

    render() {
        var productsRows = this.props.data.map(function (product) {
            return (
                <ProductTableRow key={product.id} product={product}/>
            );
        });
        return (
            <table className="table">
                <ProductTableHeader />
                <tbody>
                    {productsRows}
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
