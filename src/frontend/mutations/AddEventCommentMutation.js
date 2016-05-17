import Relay from 'react-relay';
import moment from 'moment'

class AddEventCommentMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addEventComment}`
    }

    getFatQuery() {

        return Relay.QL`
          fragment on addEventCommentPayload {
              commentEdge
              event {
                comments
              }
          }
        `
    }
    getConfigs() {

        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    event: this.props.event.id
                }
           
            },
            {
                type: 'RANGE_ADD',
                parentName: 'event',
                parentID: this.props.event.id,
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
            viewer: {
                id: this.props.viewer.id,
            },
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
