'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _graphql = require('graphql');

var _StockMutations = require('./graphql/StockMutations');

var _CartMutations = require('./graphql/CartMutations');

var _Model = require('./graphql/Model');

var Mutation = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addModel: _StockMutations.AddModelMutation,
        addItem: _StockMutations.AddItemMutation,
        addItemInCart: _CartMutations.AddItemInCartMutation,
        removeItemFromCart: _CartMutations.RemoveItemFromCartMutation
    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: _Model.GraphQLRoot,
    mutation: Mutation
});