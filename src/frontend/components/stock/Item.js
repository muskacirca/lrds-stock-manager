import React from 'react'
import Relay from 'react-relay'

import ItemDisplay from './ItemDisplay'
import CommentComponent from '../utils/forms/CommentComponent'
import FormHeader from '../utils/forms/FormHeader'

import AddItemCommentMutation from '../../mutations/stock/AddItemCommentMutation'
import UserService from '../utils/AuthService'

class ItemComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    handleCommentPublish(comment) {

        var addItemCommentMutation = new AddItemCommentMutation({
            text: comment,
            author: UserService.getLogin(),
            item: this.props.viewer.item
        });

        var onSuccess = (response) => console.log("Item comment added successfully !");

        var onFailure = (transaction) => console.log("An error occurred when adding new item comment");

        Relay.Store.commitUpdate(addItemCommentMutation, {onSuccess, onFailure})
    }
    
    renderPageTitle(item) {
        return  <div>
                    <span>{item.model.brand.name + " - " + item.model.name}</span>
                    <span>{" (" + item.reference + ")"}</span>
                </div>
    }


    render() {

        var item = this.props.viewer.item
        var title = this.renderPageTitle(item)

        return  <div>
                    <FormHeader title={title} />
                            
                    <div className="page-content">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <ItemDisplay item={item}/>
                                <CommentComponent handleCommentPublish={this.handleCommentPublish.bind(this)}
                                                  comments={item.comments.edges} />
                            </div>
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
                ${AddItemCommentMutation.getFragment('item')}
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
