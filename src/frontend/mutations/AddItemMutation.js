import Relay from 'react-relay';

class AddModelMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id,
            status

          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addItem}`
    }

    getFatQuery() {

        console.log("geting FatQuery")

        return Relay.QL`
          fragment on AddItemPayload {
            viewer {
              status
            }
          }
        `
    }
    getConfigs() {

        console.log("getting config")
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    viewer: this.props.viewer.id
                }
            },
            ];
    }
    getVariables() {
        console.log("getting FatQuery")
        return {
            name: this.props.modelName,
            state: this.props.state
        };
    }
}

export default AddModelMutation
