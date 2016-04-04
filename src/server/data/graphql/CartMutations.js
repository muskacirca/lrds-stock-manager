import {
    GraphQLString,
    GraphQLNonNull
} from 'graphql'

import {
    mutationWithClientMutationId,
} from 'graphql-relay'

import Database from '../database'

import {
    GraphQLViewer,
    GraphQLCartType
} from './Model'

import {
    getViewer,
} from '../stores/ItemStore';

import {
    getCart,
    pushItemInCart,
    removeItemFromCart
} from '../stores/CartStore';

export const AddItemInCartMutation = new mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        itemReference: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        cart: {
            type: GraphQLCartType,
            resolve: (obj) => obj
        }
    },
    mutateAndGetPayload: ({itemReference}) => {
        return Database.models.item.findOne({where: {reference: itemReference}})
            .then(item => {
                pushItemInCart(item)
                return getCart()
            })
    }
});

export const RemoveItemFromCartMutation = new mutationWithClientMutationId({
    name: 'RemoveItemFromCart',
    description: 'Remove one item into the cart',
    inputFields: {
        itemReference: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        cart: {
            type: GraphQLCartType,
            resolve: (obj) => obj
        }
    },
    mutateAndGetPayload: ({itemReference}) => {
        removeItemFromCart(itemReference)
        return getCart()
    }
})
