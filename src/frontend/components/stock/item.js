import React from 'react'
import Relay from 'react-relay'

class ItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {


        return  <div className="col-md-10 col-md-offset-1">
                </div>
    }
}

export default Relay.createContainer(ItemComponent, {
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            item(reference: $reference) {
                reference
            }
          }
        `
    }
});
