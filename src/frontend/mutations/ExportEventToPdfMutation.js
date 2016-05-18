import Relay from 'react-relay';
import moment from 'moment'
import _ from 'lodash'

class ExportEventToPdfMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{exportEventToPdf}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on ExportEventToPdfPayLoad {
              output 
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
           eventId: this.props.event.id
        };
    }
}

export default ExportEventToPdfMutation
