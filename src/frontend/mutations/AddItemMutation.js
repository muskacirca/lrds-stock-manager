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
              viewer {
                items
              }
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
            },
            {
                type: 'RANGE_ADD',
                parentName: 'viewer',
                parentID: this.props.viewer.id,
                connectionName: 'items',
                edgeName: 'itemEdge',
                rangeBehaviors: {
                    // When the ships connection is not under the influence
                    // of any call, append the ship to the end of the connection
                    '': 'append',
                    // Prepend the ship, wherever the connection is sorted by age
                    'orderby(newest)': 'prepend'
                }
            }];
    }
    getVariables() {
        console.log("getting variables")
        return {
            modelName: this.props.modelName,
            state: this.props.state
        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id
            },
            itemEdge: {
                node: {
                    name: this.props.modelName,
                    model: {
                        name: this.props.modelName
                    },
                    isInStock: true,
                    reference: this.props.modelName + "/" + this.props.state
                }
            }
        };
    }
}

export default AddItemMutation
