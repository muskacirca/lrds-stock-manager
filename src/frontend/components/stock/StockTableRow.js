import React from 'react'

class StockTableRow extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        var isInStock = this.props.product.isInStock ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>

        return (
            <tr onCLick="">
                <td>{this.props.product.model.name}</td>
                <td>{this.props.product.reference}</td>
                <td>{isInStock}</td>
            </tr>
        )
    }
}

export default StockTableRow