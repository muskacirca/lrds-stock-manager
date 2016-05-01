'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AddEventMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _ItemStore = require('../stores/ItemStore');

var _CartStore = require('../stores/CartStore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddEventMutation = exports.AddEventMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddEvent',
    description: 'Function to add an event',
    inputFields: {
        name: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        startDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        endDate: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        description: { type: _graphql.GraphQLString },
        reservedItems: { type: new _graphql.GraphQLList(_graphql.GraphQLString) },
        userId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }

    },
    outputFields: {
        viewer: {
            type: _Model.GraphQLViewer,
            resolve: function resolve() {
                return _CartStore.getViewer;
            }
        },
        cart: {
            type: _Model.GraphQLCartType,
            resolve: function resolve(args) {
                return (0, _ItemStore.emptyCart)(args.userId);
            }
        },
        eventEdge: {
            type: _Model.EventsEdge,
            resolve: function resolve(obj, _ref) {
                var id = _ref.id;


                return _database2.default.models.event.findAll().then(function (events) {

                    var eventToPass = void 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var event = _step.value;

                            if (event.id === obj.id) {
                                eventToPass = event;
                            }
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    var cursor = (0, _graphqlRelay.cursorForObjectInConnection)(events, eventToPass);
                    return {
                        cursor: cursor,
                        node: eventToPass
                    };
                });
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
        var name = _ref2.name;
        var startDate = _ref2.startDate;
        var endDate = _ref2.endDate;
        var description = _ref2.description;
        var reservedItems = _ref2.reservedItems;


        var event = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description
        };

        return _database2.default.models.event.create(event).then(function (event) {
            reservedItems.forEach(function (reference) {
                _database2.default.models.item.findOne({ where: { reference: reference } }).then(function (item) {
                    return event.addItem(item);
                });
            });

            return event;
        });
    }
});