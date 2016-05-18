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

var _UserStore = require('../stores/UserStore');

var _CartStore = require('../stores/CartStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddItemInCartMutation = exports.AddItemInCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _UserStore.getViewer;
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
        var viewerId = _ref.viewerId;
        var itemReference = _ref.itemReference;

        return _database2.default.models.item.findOne({ where: { reference: itemReference } }).then(function (item) {
            (0, _CartStore.pushItemInCart)(viewerId, item);
            return (0, _CartStore.getCart)(viewerId);
        });
    }
});

var RemoveItemFromCartMutation = exports.RemoveItemFromCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'RemoveItemFromCart',
    description: 'Remove one item into the cart',
    inputFields: {
        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt) },
        itemReference: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _UserStore.getViewer;
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
        var viewerId = _ref2.viewerId;
        var itemReference = _ref2.itemReference;

        (0, _CartStore.removeItemFromCart)(viewerId, itemReference);
        return (0, _CartStore.getCart)(viewerId);
    }
});

var EmptyCartMutation = exports.EmptyCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'EmptyCart',
    description: 'Empty cart',
    inputFields: {
        viewerId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve(args) {
                return (0, _UserStore.getViewer)(args.viewerId);
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
        var viewerId = _ref3.viewerId;

        (0, _CartStore.emptyCart)(viewerId);
        return (0, _CartStore.getCart)(viewerId);
    }
});