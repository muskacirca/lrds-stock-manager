import React from 'react'

class CartComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleCart: false
        }
    }

    toggleCartDisplay() {
        console.log(this.props.cart.length)
        if(this.props.cart.selectedItems.length != 0) this.setState({toggleCart: !this.state.toggleCart})
    }

    onRemoveItemFromCart(reference) {
        console.log("removing item from cart: " + reference)
        // this.props.removeItemFromCart(reference)
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

        var cartItems = this.renderCart(this.props.cart)
        let styles = {
            display: this.state.toggleCart && cartItems.length > 0 ? 'block' : 'none'
        };

        return  <div className="navbar-link-color">
                    <i className="fa fa-2x fa-shopping-cart pointer" onClick={this.toggleCartDisplay.bind(this)}>
                        <span className="badge">{cartItems.length}</span>
                    </i>
                    <div className="cart-dropdown" style={styles}>
                        {cartItems}
                        <div>Empty cart</div>
                    </div>
                </div>
    }
}

export default CartComponent
