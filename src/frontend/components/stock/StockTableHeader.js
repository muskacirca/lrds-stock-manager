import React from 'react'

class StockTableHeader extends React.Component {

    render() {
        return (
            <thead>
            <tr>
                <th>Etat</th>
                <th>Modèle</th>
                <th>Marque</th>
                <th>Reference</th>
                <th>En Stock</th>
            </tr>
            </thead>
        )
    }
}

export default StockTableHeader