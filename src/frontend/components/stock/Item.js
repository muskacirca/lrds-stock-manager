import React from 'react'
import Relay from 'react-relay'

import ItemDisplay from './ItemDisplay'
import CommentComponent from '../utils/forms/CommentComponent'

class ItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleCommentPublish(comment) {
        
    }

    render() {

        var item = this.props.viewer.item

        return  <div className="page-content">
                    <div className="row">
                        <div className="col-md-10 col-md-offset-1">
                            <ItemDisplay item={item}/>
                            <CommentComponent handleCommentPublish={this.handleCommentPublish.bind(this)}
                                              comments={item.comments.edges} />
                        </div>
                    </div>
            
                </div>
    }
}

export default Relay.createContainer(ItemComponent, {

    initialVariables: {
        reference: null
    },
    prepareVariables({ reference }) {

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
