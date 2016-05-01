import Relay from 'react-relay';

class AddModelMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
                id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addModel}`
    }

    getFatQuery() {

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
                    '': 'append',
                    // Prepend the ship, wherever the connection is sorted by age
                    'first(100)': 'prepend'
            }
        }];
    }
    getVariables() {
        return {
            name: this.props.modelName,
            brandName: this.props.brandName
        };
    }

    getOptimisticResponse() {

        return {
            viewer: {
                id: this.props.viewer.id
            },
            modelEdge: {
                node: {
                    name: this.props.modelName,
                    brand: {
                        name: this.props.brandName
                    },
                    domains: [],
                    subCategories: []
                }
            }

        }
    }
}

export default AddModelMutation
