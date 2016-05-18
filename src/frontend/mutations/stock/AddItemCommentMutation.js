import Relay from 'react-relay';
import moment from 'moment'
import _ from 'lodash'

class AddItemCommentMutation extends Relay.Mutation {

    static fragments = {
        item: () => Relay.QL`
          fragment on ItemType {
            id
            comments(first: 10) {
               edges {
                  node {
                    text
                    author
                    createdAt
                  }
                }
            }
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addItemComment}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on AddItemCommentPayload {
              item 
          }
        `
    }
    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    item: this.props.item.id
                }

            },
        ]
    }
    getVariables() {
        return {
            text: this.props.text,
            author: this.props.author,
            itemId: this.props.item.id
        };
    }

    getOptimisticResponse() {
        var actualItem = _.cloneDeep(this.props.item);
        actualItem.comments.edges.push({
            node: {
                text: this.props.text,
                author: this.props.author,
                createdAt: moment()
            }
        });

        return {
            comments: actualItem.comments,
            id: this.props.item.id
        }
    }
}

export default AddItemCommentMutation
