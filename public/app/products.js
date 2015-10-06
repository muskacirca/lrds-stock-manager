var Table = ReactBootstrap.Table;

var ProductBox = React.createClass({

    loadCommentsFromServer: function() {
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
        });
    },

    getInitialState: function() {
        return {data: []};
    },

    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    
    render: function () {
        return (
            <div className="productBox">
                <div className="productsTable">
                    <ProductTable data={this.state.data}/>
                </div>
            </div>
        );
    }
});

var ProductTable = React.createClass({

    render: function() {
        var productsRows = this.props.data.map(function (product) {
            return (
                <ProductTableRow product={product}/>
            );
        });
        return (
            <Table>
                <ProductTableHeader />
                <tbody>
                    {productsRows}
                </tbody>
            </Table>
        );
    }
});

var ProductTableHeader = React.createClass({

    render: function() {
        return (
            <thead>
                <tr>
                    <th>Nom</th>
                    <th>En stock</th>
                </tr>
            </thead>
        );
    }
});

var ProductTableRow = React.createClass({
    render: function() {
            return (
                <tr>
                    <td>{this.props.product.name}</td>
                    <td>{this.props.product.isInStock}</td>
                </tr>
        );
    }
});



React.render(
    <ProductBox url="products.json"/>,
    document.getElementById('content')
)