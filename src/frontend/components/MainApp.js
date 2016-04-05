import React from 'react'
import Relay from 'react-relay'
import Cart from './Cart'

import NavBarBox from './navbar'

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

        console.log("Main app render: " + this.props.viewer.id);
        
        var cart =  <Cart viewer={this.props.viewer} />
        
        return (
            <div className="site-pusher">
                <NavBarBox shoppingCart={cart}/>
               
                <div className="site-content">
                    <div className="container">
                        {this.props.children}
                    </div>
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
            ${Cart.getFragment('viewer')}
          }
        `
    }
})

