import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    AddItemMutation,
    AddModelMutation
} from './graphql/StockMutations'

import {
    AddItemInCartMutation,
    RemoveItemFromCartMutation
} from './graphql/CartMutations'

import {
    GraphQLRoot
} from './graphql/Model'


var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addModel: AddModelMutation,
        addItem: AddItemMutation,
        addItemInCart: AddItemInCartMutation,
        removeItemFromCart: RemoveItemFromCartMutation
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
