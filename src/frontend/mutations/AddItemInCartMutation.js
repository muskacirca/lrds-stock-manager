import Relay from 'react-relay';

class AddItemInCartMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{addItemInCart}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on AddItemInCartPayload {
              cart
              viewer
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
            }]
    }
    getVariables() {
        return {
            itemReference: this.props.itemReference
        };
    }

    getOptimisticResponse() {
        return {
            cart: {
                selectedItems: [{
                    reference : this.props.itemReference
                }]
            },
            viewer: this.props.viewer
            
        };
    }
}

export default AddItemInCartMutation
