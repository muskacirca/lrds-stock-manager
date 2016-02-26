import Relay from 'react-relay';

class AddModelMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id,

          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addModel}`
    }

    getFatQuery() {

        console.log("geting FatQuery")

        return Relay.QL`
          fragment on AddModelPayload {
            modelEdge,
            viewer {
              models
            }
          }
        `
    }
    getConfigs() {

        console.log("geting config")
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
                connectionName: 'models',
                edgeName: 'modelEdge',
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
        console.log("getting FatQuery")
        return {
            name: this.props.modelName,
            brandName: this.props.brandName
        };
    }

    getOptimisticResponse() {

        console.log("getOptimisticResponse")

        return {
            viewer: {
                id: this.props.viewer.id
            },
            modelEdge: {
                node: {
                    name: this.props.modelName,
                    brand: {
                        name: this.props.brandName
                    }
                }
            }

        }
    }
}

export default AddModelMutation
