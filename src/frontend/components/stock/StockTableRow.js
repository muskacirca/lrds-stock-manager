import React from 'react'


class StockTableRow extends React.Component {

    constructor(props) {
        super(props)
    }

    computeState(state) {
        if(state == "1") {
            return  <i className="fa fa fa-square green" />
        } else if(state == "2") {
            return  <i className="fa fa fa-square yellow" />
        } else if(state == "3") {
            return  <i className="fa fa fa-square orange" />
        } else if(state == "4") {
            return  <i className="fa fa fa-square red" />
        }
    }

    handleRowClick() {
        this.props.handleRowClick(this.props.item.reference)
    }

    onAddToCartClick(isInStock) {
        if(isInStock) this.props.handleAddItemToCart(this.props.item.reference)
    }

    render() {

        let item = this.props.item;
        let isInStock = item.isInStock ? <i className="fa fa-check" /> : <i className="fa fa-times" />;
        let state = this.computeState(item.state.severity);
        let actionIconClass = !item.isInStock ? "pointer-disabled" : "pointer";

        
        return  <tr>
                    <td className="pointer" onClick={this.handleRowClick.bind(this)}>{state}</td>
                    <td>{item.model.name}</td>
                    <td>{item.model.brand.name}</td>
                    <td className="mobile-hide">{item.reference}</td>
                    <td>{isInStock}</td>
                    <td>
                        <div className="row">
                            <div className={actionIconClass} onClick={this.onAddToCartClick.bind(this, item.isInStock)}>
                                <i className="fa fa-cart-plus" />
                            </div>
                        </div>

                    </td>
                </tr>

    }
}

export default StockTableRow
