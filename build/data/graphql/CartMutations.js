'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EmptyCartMutation = exports.RemoveItemFromCartMutation = exports.AddItemInCartMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _ItemStore = require('../stores/ItemStore');

var _CartStore = require('../stores/CartStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddItemInCartMutation = exports.AddItemInCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _ItemStore.getViewer;
            }
        },
        cart: {
            type: _Model.GraphQLCartType,
            resolve: function resolve(obj) {
                return obj;
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
        var itemReference = _ref.itemReference;

        return _database2.default.models.item.findOne({ where: { reference: itemReference } }).then(function (item) {
            (0, _CartStore.pushItemInCart)(item);
            return (0, _CartStore.getCart)();
        });
    }
});

var RemoveItemFromCartMutation = exports.RemoveItemFromCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'RemoveItemFromCart',
    description: 'Remove one item into the cart',
    inputFields: {
        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _ItemStore.getViewer;
            }
        },
        cart: {
            type: _Model.GraphQLCartType,
            resolve: function resolve(obj) {
                return obj;
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
        var itemReference = _ref2.itemReference;

        (0, _CartStore.removeItemFromCart)(itemReference);
        return (0, _CartStore.getCart)();
    }
});

var EmptyCartMutation = exports.EmptyCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'EmptyCart',
    description: 'Empty cart',
    inputFields: {},
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _ItemStore.getViewer;
            }
        },
        cart: {
            type: _Model.GraphQLCartType,
            resolve: function resolve(obj) {
                return obj;
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
        var itemReference = _ref3.itemReference;

        (0, _CartStore.emptyCart)(1);
        return (0, _CartStore.getCart)();
    }
});