import Relay from 'react-relay';

class RemoveItemFromCartMutation extends Relay.Mutation {

    static fragments = {
        cart: () => Relay.QL`
          fragment on CartType {
                id
                count
                selectedItems {
                    reference
                }
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
          }
        `
    }
    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',
                fieldIDs: {
                    cart: this.props.cart.id
                }
            }]
    }
    getVariables() {
        return {
            viewerId: this.props.viewerId,
            itemReference: this.props.itemReference
        };
    }

    getOptimisticResponse() {
        
        return {
            id: this.props.cart.id,
            count: this.props.cart.count - 1

        };
    }
}

export default RemoveItemFromCartMutation
