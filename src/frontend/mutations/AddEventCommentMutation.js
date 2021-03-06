import Relay from 'react-relay';
import moment from 'moment'
import _ from 'lodash'

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
              event 
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
        ]
    }
    getVariables() {
        return {
            text: this.props.text,
            author: this.props.author,
            eventId: this.props.event.id
        };
    }

    getOptimisticResponse() {
        var actualEvent = _.cloneDeep(this.props.event);
        actualEvent.comments.edges.push({
            node: {
                text: this.props.text,
                author: this.props.author,
                createdAt: moment()
            }
        });
        
        return {
            comments: actualEvent.comments,
            id: this.props.event.id
        }
    }
}

export default AddEventCommentMutation
