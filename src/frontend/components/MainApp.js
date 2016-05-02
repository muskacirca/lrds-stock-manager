import React from 'react'
import Relay from 'react-relay'
import CartIcon from './cart/CartIcon'

import NavBarBox from './navbar'
import CartDropdown from './cart/CartDropdown'

import {
    toggleClassInBody
} from '../../utils/utils'

class MainApp extends React.Component{

    constructor(props) {
        super(props);
    }

    onHiddenSiteCLick() {
        var className = 'with--sidebar'
        toggleClassInBody(className)

    }

    render() {        
        var cart =  <CartIcon viewer={this.props.viewer} />
        return (
            <div className="site-pusher">
                <NavBarBox shoppingCart={cart} user={this.props.viewer.user}/>
               
                <div className="site-content">
                    {this.props.children}
                </div>
                <div className="cart-pusher">
                    <CartDropdown viewer={this.props.viewer}/>
                </div>
                <div className="site-cache" onClick={this.onHiddenSiteCLick.bind(this)}></div>
            </div>
        );
    }
}

export default Relay.createContainer(MainApp, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            user {
                login
            }
            ${CartIcon.getFragment('viewer')}
            ${CartDropdown.getFragment('viewer')}
          }
        `
    }
})

