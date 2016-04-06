import React from 'react'
import Relay from 'react-relay'

import RemoveItemFromCartMutation from '../../mutations/RemoveItemFromCartMutation'

class CartDropdownComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    onRemoveItemFromCart(reference) {
        console.log("removing item from cart: " + reference)
        var removeItemFromCartMutation = new RemoveItemFromCartMutation({
            itemReference: reference,
            cart: this.props.viewer.cart
        });

        var onSuccess = (response) => console.log("Remove item from cart");

        var onFailure = (transaction) => console.log("Remove item from cart failed");

        Relay.Store.commitUpdate(removeItemFromCartMutation, {onSuccess, onFailure})
    }

    renderCart(cart) {

        return cart.selectedItems.map(item => {
            return  <div className="row">
                <div className="col-md-10">
                    <div key={"cart-" + item.reference}>{item.reference}</div>
                </div>
                <div className="col-md-2">
                    <i className="fa fa-times red" onClick={this.onRemoveItemFromCart.bind(this, item.reference)}/>
                </div>
            </div>

        })
    }

    render() {
        
        var cartItems = this.renderCart(this.props.viewer.cart)

        return  <div className="cart-dropdown">
                    {cartItems}
                    <div>Empty cart</div>
                </div>
    }
}

export default Relay.createContainer(CartDropdownComponent, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            cart {
                ${RemoveItemFromCartMutation.getFragment('cart')}
                selectedItems {
                    reference
                }
            }
          }
        `
    }
})
