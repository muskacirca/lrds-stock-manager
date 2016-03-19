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
        console.log("first : " + this.props.item.reference)
        this.props.handleRowClick(this.props.item.reference)
    }

    render() {

        var item = this.props.item;
        var isInStock = item.isInStock ? <i className="fa fa-check"></i> : <i className="fa fa-times"></i>
        var state = this.computeState(item.state.severity)

        return  <tr className="pointer" onClick={this.handleRowClick.bind(this)}>
                    <td>{state}</td>
                    <td>{item.model.name}</td>
                    <td>{item.model.brand.name}</td>
                    <td>{item.reference}</td>
                    <td>{isInStock}</td>
                </tr>

    }
}

export default StockTableRow
