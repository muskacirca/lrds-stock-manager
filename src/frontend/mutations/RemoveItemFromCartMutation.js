import Relay from 'react-relay';

class RemoveItemFromCartMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{removeItemFromCart}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on RemoveItemFromCartPayload {
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
        
        console.log("getOptimisticResponse : " + JSON.stringify(this.props.viewer.cart))
        
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

export default RemoveItemFromCartMutation
