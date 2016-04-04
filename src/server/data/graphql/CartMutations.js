import {
    GraphQLString
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    offsetToCursor
} from 'graphql-relay'

import Database from './database'

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



const AddItemInCartMutation = new mutationWithClientMutationId({
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

export default AddItemInCartMutation
