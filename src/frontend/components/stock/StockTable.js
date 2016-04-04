import React from 'react'
import Relay from 'react-relay'

import StockTableHeader from './StockTableHeader'
import StockTableRow from './StockTableRow'

class StockTable extends React.Component {

    constructor(props) {
        super(props)
    }

    handleRowClick(id) {
        this.props.handleSelectRow(id)
    }

    handleAddItemToCart(reference) {
        console.log("second " + reference)
        this.props.handleAddItemToCart(reference)
    }

    renderStockTableRows(rowsToShow) {

       return rowsToShow.map((item, key) => {
            return <StockTableRow key={item.reference + "-" + key} item={item}
                                  handleRowClick={this.handleRowClick.bind(this)}
                                  handleAddItemToCart={this.handleAddItemToCart.bind(this)} />
        })
    }

    render() {

        var rows = this.renderStockTableRows(this.props.data)

        return  <table className="table">
                    <StockTableHeader />
                    <tbody>
                        {rows}
                    </tbody>
                </table>
    }
}


export default StockTable
