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
                    // When the ships connection is not under the influence
                    // of any call, append the ship to the end of the connection
                    '': 'append',
                    // Prepend the ship, wherever the connection is sorted by age
                    'orderby(newest)': 'prepend'
            }
        }];
    }
    getVariables() {
        return {
            name: this.props.modelName,
            brandName: this.props.brandName
        };
    }
    //getOptimisticResponse() {
    //    return {
    //        id: model.id,
    //        name: this.props.modelName,
    //        viewer: {
    //            id: this.props.viewer.id,
    //        },
    //    }
    //}
}

export default AddModelMutation
