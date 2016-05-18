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

    computeStateIcon(state) {

        if(state == "1") {
            return  <i className="fa fa-2x fa-thumbs-up green" />
        } else if(state == "2") {
            return  <i className="fa fa-2x fa-thumbs-up yellow" />
        } else if(state == "3") {
            return  <i className="fa fa-2x fa-thumbs-down orange" />
        } else if(state == "4") {
            return  <i className="fa fa-2x fa-thumbs-down red" />
        }
    }

    renderHeaderContent(item) {
        return  <div>{this.computeStateIcon(item.state.severity)}</div>
    }

    render() {

        var item = this.props.viewer.item
        var title = this.renderPageTitle(item)
        var headerContent = this.renderHeaderContent(item)

        return  <div>
                    <FormHeader title={title} content={headerContent}/>
                            
                    <div className="page-content">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1">
                                <ItemDisplay item={item} showHeader={false} />
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
