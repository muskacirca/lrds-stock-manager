import Relay from 'react-relay';
import _ from 'lodash'

class AddItemInCartMutation extends Relay.Mutation {

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
        return Relay.QL`mutation{addItemInCart}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on AddItemInCartPayload {
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
        console.log("get optimistic responbse : " + JSON.stringify(this.props.cart))

        var actualCart = _.cloneDeep(this.props.cart)
        actualCart.selectedItems.push({reference : this.props.itemReference})

        console.log("modified cart : " + JSON.stringify(actualCart))
        
        return {
                count: this.props.cart.count + 1,
                selectedItems: actualCart.selectedItems,
                id: this.props.cart.id

        };
    }
}

export default AddItemInCartMutation
