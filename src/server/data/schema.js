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
    RemoveItemFromCartMutation,
    EmptyCartMutation
} from './graphql/CartMutations'

import {
    AddEventMutation,
    AddEventCommentMutation
} from './graphql/EventMutations'

import {
    GraphQLRoot
} from './graphql/Model'


var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addModel: AddModelMutation,
        addItem: AddItemMutation,
        addItemInCart: AddItemInCartMutation,
        removeItemFromCart: RemoveItemFromCartMutation,
        emptyCart: EmptyCartMutation,
        addEvent: AddEventMutation,
        addEventComment: AddEventCommentMutation,
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
