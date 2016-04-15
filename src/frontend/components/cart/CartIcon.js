import React from 'react'
import Relay from 'react-relay'

import {
    toggleClassInBody
} from '../../../utils/utils'

class CartComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleCart: false
        }
    }

    toggleCartDisplay() {
        toggleClassInBody('with--cart')
    }

    render() {

        var cartCount = this.props.viewer.cart.count

        return  <div onClick={this.toggleCartDisplay.bind(this)}>
                    <i className="fa fa-2x fa-shopping-cart pointer">
                        <span className="badge">{cartCount}</span>
                    </i>
                </div>
    }
}

export default Relay.createContainer(CartComponent, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            cart(viewerId: "Vmlld2VyOg==") {
                count
            }
          }
        `
    }
})
