import {
    GraphQLString
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
} from '../ItemStore';

import {
    getCart,
    pushItemInCart
} from '../CartStore';

export const AddItemInCartMutation = new mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        itemReference: {type: GraphQLString}
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
})
