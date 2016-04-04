'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddItemInCartMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _ItemStore = require('../ItemStore');

var _CartStore = require('../CartStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddItemInCartMutation = exports.AddItemInCartMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddItemInCart',
    description: 'Add one item into the cart',
    inputFields: {
        itemReference: { type: _graphql.GraphQLString }
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