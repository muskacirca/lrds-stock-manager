import {
    GraphQLString,
    GraphQLInt,
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
    removeItemFromCart,
    emptyCart
} from '../stores/CartStore';

export const AddItemInCartMutation = new mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        viewerId: {type: new GraphQLNonNull(GraphQLInt)},
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
    mutateAndGetPayload: ({viewerId, itemReference}) => {
        return Database.models.item.findOne({where: {reference: itemReference}})
            .then(item => {
                pushItemInCart(viewerId, item)
                return getCart(viewerId)
            })
    }
});

export const RemoveItemFromCartMutation = new mutationWithClientMutationId({
    name: 'RemoveItemFromCart',
    description: 'Remove one item into the cart',
    inputFields: {
        viewerId: {type: new GraphQLNonNull(GraphQLInt)},
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
    mutateAndGetPayload: ({viewerId, itemReference}) => {
        removeItemFromCart(viewerId, itemReference)
        return getCart(viewerId)
    }
})



export const EmptyCartMutation = new mutationWithClientMutationId({
    name: 'EmptyCart',
    description: 'Empty cart',
    inputFields: {
        viewerId: {type: new GraphQLNonNull(GraphQLString)}
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
    mutateAndGetPayload: ({viewerId}) => {
        emptyCart(viewerId)
        return getCart(viewerId)
    }
})