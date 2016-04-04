import React from 'react'
import Relay from 'react-relay'

import NavBarBox from './navbar'

class MainApp extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        console.log("Main app render: " + this.props.viewer.id);

        return (
            <div>
                <NavBarBox viewer={this.props.viewer} />
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Relay.createContainer(MainApp, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            cart {
                selectedItems {
                    reference
                }
            }
          }
        `
    }
})

