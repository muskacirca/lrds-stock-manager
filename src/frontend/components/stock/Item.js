import React from 'react'
import Relay from 'react-relay'

import ItemDisplay from './ItemDisplay'

class ItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    render() {

        var item = this.props.viewer.item

        return  <div className="col-md-10 col-md-offset-1">
                    <ItemDisplay item={item}/>
                </div>
    }
}

export default Relay.createContainer(ItemComponent, {

    initialVariables: {
        reference: null
    },
    prepareVariables({ reference }) {

        console.log("reference in ItemComponent : " + reference)
        return {
            reference: reference
        }
    },
    fragments: {
        viewer: () => Relay.QL`
          fragment on Viewer {
            item(reference: $reference) {
                reference
                model {
                    name
                    description
                    brand {
                        name
                    }
                    domains {
                        name
                    }
                    subCategories {
                        name
                    }
                }
                state {
                    severity
                }
                comments(first: 10) {
                    edges {
                        node {
                            text
                        }
                    }
                }
            }
          }
        `
    }
});
