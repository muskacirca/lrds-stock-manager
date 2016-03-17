import React from 'react'
import StockTableHeader from './StockTableHeader'
import StockTableRow from './StockTableRow'

class StockTable extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {

        var filterText = this.props.filterText.toLowerCase()
        var filterTags = this.props.tags

        var counter = 0

        console.log("ProductTable render: " + this.props.data.length)

        var taggedFilteredRows = []
        if (filterTags.length !== 0) {
            taggedFilteredRows = this.props.data.map(function (product) {

                if (counter < 35) {
                    var hasTags = false
                    for(var i = 0; i < filterTags.length; i++) {
                        if (product.node.model.name.toLowerCase().indexOf(filterTags[i].toLowerCase()) != -1) {
                            counter += 1
                            hasTags = true
                        }
                    }

                    return hasTags ? product : undefined
                }
            })
        }

        var t = taggedFilteredRows.filter(function (element) {
            return element !== undefined;
        })

        counter = 0

        var rowsToShow = t.length === 0 ? this.props.data : t
        var rows = rowsToShow.map(function (product, key) {

            if(counter < 35 ) {
                if (filterText === "" || filterText.length <= 2 ) {
                    counter += 1
                    console.log("adding product table row : " + product.node.model.name)
                    return <StockTableRow key={key} product={product.node}/>

                } else if (filterText.length > 2 && product.node.model.name.toLowerCase().indexOf(filterText) != -1) {
                    counter += 1
                    return <StockTableRow key={key} product={product.node}/>
                }
            }
        })

        return (
            <table className="table">
                <StockTableHeader />
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

export default StockTable