import Relay from 'react-relay';
import _ from 'lodash'

class AddItemInCartMutation extends Relay.Mutation {

    static fragments = {
        viewer: () => Relay.QL`
          fragment on Viewer {
            id
            cart {
                selectedItems {
                    reference
                }
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
        console.log("get optimistic responbse : " + JSON.stringify(this.props.viewer.cart))

        var actualCart = _.cloneDeep(this.props.viewer.cart)
        actualCart.selectedItems.push({reference : this.props.itemReference})

        console.log("modified cart : " + JSON.stringify(actualCart))
        
        return {
            cart: actualCart,
            viewer: this.props.viewer

        };
    }
}

export default AddItemInCartMutation
