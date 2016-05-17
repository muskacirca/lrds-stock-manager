import Relay from 'react-relay';
import moment from 'moment'

class AddEventCommentMutation extends Relay.Mutation {

    static fragments = {
        event: () => Relay.QL`
          fragment on EventType {
            id
            comments(first: 5) {
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
        return Relay.QL`mutation{addEventComment}`
    }

    getFatQuery() {

        return Relay.QL`
          fragment on AddEventCommentPayload {
              commentEdge
              comments 
          }
        `
    }
    getConfigs() {

        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    event: this.props.eventId
                }
           
            },
            {
                type: 'RANGE_ADD',
                parentName: 'event',
                parentID: this.props.eventId,
                connectionName: 'events',
                edgeName: 'eventEdge',
                rangeBehaviors: {
                    '': 'append',
                    // Prepend the ship, wherever the connection is sorted by age
                    'first(100)': 'prepend'
                }
            }
        ]
    }
    getVariables() {
        return {
            text: this.props.text,
            author: this.props.author,
        };
    }

    getOptimisticResponse() {
        return {
            eventEdge: {
                node: {
                    text: this.props.text,
                    author: this.props.author,
                    createdDate: moment()
                }
            }
        };
    }
}

export default AddEventCommentMutation
