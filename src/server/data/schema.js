import {
    GraphQLObjectType,
    GraphQLSchema
} from 'graphql'

import {
    AddItemMutation,
    AddModelMutation,
    AddItemCommentMutation
} from './Stock/StockMutations'

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
        addItemComment: AddItemCommentMutation,
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
