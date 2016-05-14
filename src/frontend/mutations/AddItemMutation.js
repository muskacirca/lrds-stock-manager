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

        return Relay.QL`
          fragment on AddItemPayload {
              itemEdge,
              viewer {
                items
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
                connectionName: 'items',
                edgeName: 'itemEdge',
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
            modelName: this.props.modelName,
            severity: this.props.severity,
            domains: this.props.domains,
            subCategories: this.props.subCategories,
            comments: this.props.comments
        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id
            },
            itemEdge: {
                node: {
                    model: {
                        name: this.props.modelName
                    },
                    isInStock: true,
                    reference: this.props.modelName + "/" + this.props.severity
                }
            }
        };
    }
}

export default AddItemMutation
