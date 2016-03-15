import Relay from 'react-relay';

class AddItemMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addItem}`
    }

    getFatQuery() {

        console.log("getting FatQuery")

        return Relay.QL`
          fragment on AddItemPayload {
              viewer
              itemEdge
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
            }]
    }
    getVariables() {
        console.log("getting variables : " + JSON.stringify(this.props.domains))
        return {
            modelName: this.props.modelName,
            state: this.props.state,
            domains: this.props.domains
        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id
            },
            itemEdge: {
                    model: {
                        name: this.props.modelName
                    },
                    isInStock: true,
                    reference: this.props.modelName + "/" + this.props.state
            }
        };
    }
}

export default AddItemMutation
