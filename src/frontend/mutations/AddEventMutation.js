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
        return Relay.QL`mutation{addEvent}`
    }

    getFatQuery() {

        console.log("getting FatQuery")

        return Relay.QL`
          fragment on AddEventPayload {
              eventEdge,
              viewer {
                cart
                events
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
            {
                type: 'RANGE_ADD',
                parentName: 'viewer',
                parentID: this.props.viewer.id,
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
            name: this.props.name,
            description: this.props.description,
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            reservedItems: this.props.reservedItems,
            userId: this.props.userId
        };
    }

    getOptimisticResponse() {
        return {
            viewer: {
                id: this.props.viewer.id,
                cart: {
                    selectedItems: []
                }
            },
            eventEdge: {
                node: {
                    name: this.props.name,
                    description: this.props.description,
                    startDate: this.props.startDate,
                    endDate: this.props.endDate,
                    reservedItems: this.props.reservedItems
                }
            }
        };
    }
}

export default AddItemMutation
