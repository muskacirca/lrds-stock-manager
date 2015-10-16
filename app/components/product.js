import React from 'react'
import SearchComponent from './sidebars/searchInput.js'

class ProductComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            productId: props.params.id
        }
        console.log(props.params.id)
    }

    render() {
        return (<div>
                     product numero {this.state.productId}
                </div>)
    }
}

export default ProductComponent
