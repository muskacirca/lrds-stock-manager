'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ExportEventToPdfMutation = exports.AddEventCommentMutation = exports.AddEventMutation = undefined;

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _Model = require('./Model');

var _CartStore = require('../stores/CartStore');

var _UserStore = require('../stores/UserStore');

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
            resolve: function resolve(obj) {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId));
                return (0, _UserStore.getViewer)(obj.viewerId);
            }
        },
        cart: {
            type: _Model.GraphQLCartType,
            resolve: function resolve(obj) {
                return (0, _CartStore.emptyCart)(obj.viewerId);
            }
        },
        eventEdge: {
            type: _Model.EventsEdge,
            resolve: function resolve(obj) {

                return _database2.default.models.event.findAll().then(function (events) {

                    var eventToPass = void 0;
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var event = _step.value;

                            if (event.id === obj.event.id) {
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
    mutateAndGetPayload: function mutateAndGetPayload(_ref) {
        var name = _ref.name;
        var startDate = _ref.startDate;
        var endDate = _ref.endDate;
        var description = _ref.description;
        var reservedItems = _ref.reservedItems;
        var userId = _ref.userId;


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

            return {
                viewerId: userId,
                event: event
            };
        });
    }
});

var AddEventCommentMutation = exports.AddEventCommentMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'AddEventComment',
    description: 'Function to add a comment to an event',
    inputFields: {
        text: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        author: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) },
        eventId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        event: {
            type: _Model.EventType,
            resolve: function resolve(obj) {
                return obj.event;
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref2) {
        var text = _ref2.text;
        var author = _ref2.author;
        var eventId = _ref2.eventId;


        return _database2.default.models.event.findOne({ where: { id: (0, _graphqlRelay.fromGlobalId)(eventId).id } }).then(function (event) {
            return event.createComment({ text: text, author: author }).then(function (c) {
                console.log("return of create comment " + JSON.stringify(c));
                return {
                    event: event,
                    comment: c
                };
            });
        });
    }
});

var ExportEventToPdfMutation = exports.ExportEventToPdfMutation = new _graphqlRelay.mutationWithClientMutationId({
    name: 'ExportEventToPdf',
    description: 'Export an event to pdf',
    inputFields: {
        eventId: { type: new _graphql.GraphQLNonNull(_graphql.GraphQLString) }
    },
    outputFields: {
        output: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.event;
            }
        }
    },
    mutateAndGetPayload: function mutateAndGetPayload(_ref3) {
        var eventId = _ref3.eventId;


        return _database2.default.models.event.findOne({ where: { id: (0, _graphqlRelay.fromGlobalId)(eventId).id } }).then(function (event) {});
    }
});