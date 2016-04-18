import React from 'react'
import Relay from 'react-relay'

import RemoveItemFromCartMutation from '../../mutations/RemoveItemFromCartMutation'
import EmptyCartMutation from '../../mutations/EmptyCartMutation'

import UserService from '../utils/AuthService'

class CartDropdownComponent extends React.Component {

    constructor(props) {
        super(props)
    }

    onRemoveItemFromCart(reference) {
        console.log("removing item from cart: " + reference)
        var removeItemFromCartMutation = new RemoveItemFromCartMutation({
            viewerId: UserService.getUserId(),
            itemReference: reference,
            cart: this.props.viewer.cart
        });

        var onSuccess = (response) => console.log("Remove item from cart");

        var onFailure = (transaction) => console.log("Remove item from cart failed");

        Relay.Store.commitUpdate(removeItemFromCartMutation, {onSuccess, onFailure})
    }

    emptyCart() {

        var emptyCartMutation = new RemoveItemFromCartMutation();

        var onSuccess = (response) => console.log("successfully empty cart");

        var onFailure = (transaction) => console.log("error when empty cart");

        Relay.Store.commitUpdate(emptyCartMutation, {onSuccess, onFailure})
    }

    renderCart(cart) {

        return cart.selectedItems.map((item, key) => {
            return  <div key={"cart-" + key + "-" + item.reference} className="row">
                        <div className="col-md-10">
                            <div>{item.reference}</div>
                        </div>
                        <div className="col-md-2 pointer" onClick={this.onRemoveItemFromCart.bind(this, item.reference)}>
                            <i className="fa fa-times red" />
                        </div>
                    </div>

        })
    }

    render() {
        
        var cartItems = this.renderCart(this.props.viewer.cart)

        return  <div className="cart-dropdown">
                    {cartItems}
                    <div className="pointer" onClick={this.emptyCart.bind(this)}>Empty cart</div>
                </div>
    }
}

export default Relay.createContainer(CartDropdownComponent, {

    initialVariables: {viewerId: null},

    prepareVariables: prevVariables => {
        return {
            ...prevVariables,
            viewerId: UserService.getUserId() + "",
        };
    },

    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            cart(viewerId: $viewerId) {
                ${RemoveItemFromCartMutation.getFragment('cart')}
                selectedItems {
                    reference
                }
            }
          }
        `
    }
})
