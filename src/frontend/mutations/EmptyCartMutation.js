import Relay from 'react-relay';

class EmptyCartMutation extends Relay.Mutation {

    static fragments = {
        cart: () => Relay.QL`
          fragment on CartType {
                id
                count
          }
        `
    };

    getMutation() {
        return Relay.QL`mutation{emptyCart}`
    }

    getFatQuery() {
        return Relay.QL`
          fragment on EmptyCartPayload {
              cart
          }
        `
    }
    getConfigs() {
        return [
            {
                type: 'FIELDS_CHANGE',

            }]
    }

    getVariables() {
        return {

        };
    }

    getOptimisticResponse() {
        return {
            count: 0

        };
    }
}

export default EmptyCartMutation
