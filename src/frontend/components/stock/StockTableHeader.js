import React from 'react'

class StockTableHeader extends React.Component {

    render() {
        return (
            <thead>
            <tr>
                <th>Nom</th>
                <th>Reference</th>
                <th>En Stock</th>
            </tr>
            </thead>
        )
    }
}

export default StockTableHeader