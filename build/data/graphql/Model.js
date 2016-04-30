'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GraphQLRoot = exports.GraphQLViewer = exports.EventsEdge = exports.EventsConnection = exports.GraphQLModelEdge = exports.ModelsConnection = exports.GraphQLItemEdge = exports.ItemsConnection = exports.UserType = exports.EventType = exports.GraphQLCartType = exports.GraphQLItemType = exports.GraphQLStateType = exports.GraphQLCommentType = exports.GraphQLModelType = exports.GraphQLBrandType = exports.GraphQLSubCategoryType = exports.GraphQLCategoryType = exports.GraphQLDomainType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('../database');

var _database2 = _interopRequireDefault(_database);

var _ItemStore = require('../stores/ItemStore');

var _CartStore = require('../stores/CartStore');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(function (globalId) {
    var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId);

    var id = _fromGlobalId.id;
    var type = _fromGlobalId.type;

    console.log("globalId of " + type + " : " + globalId);
    console.log("id of " + type + " : " + id);
    if (type === 'ItemType') {
        console.log("Im here getting ItemType");
        return (0, _ItemStore.getById)(id);
    } else if (type === "SubCategoryType") {
        console.log("Im here getting SubCategoryType");
        return (0, _ItemStore.getViewer)(id);
    } else if (type === "DomainType") {
        console.log("Im here getting Domain");
        return (0, _ItemStore.getViewer)(id);
    } else if (type === "Viewer") {
        console.log("Im here getting viewer");
        return (0, _ItemStore.getViewer)(id);
    }
    return null;
}, function (obj) {

    if (obj instanceof Domain) {
        console.log("getting by object SubCategoryType");
        return GraphQLDomainType;
    } else if (obj instanceof _ItemStore.Viewer) {
        console.log("getting by object ViewerType");
        return GraphQLViewer;
    }
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;
var GraphQLDomainType = exports.GraphQLDomainType = new _graphql.GraphQLObjectType({
    name: 'DomainType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('DomainType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLCategoryType = exports.GraphQLCategoryType = new _graphql.GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('CategoryType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLSubCategoryType = exports.GraphQLSubCategoryType = new _graphql.GraphQLObjectType({
    name: 'SubCategoryType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('SubCategoryType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } },
        category: {
            type: GraphQLCategoryType,
            resolve: function resolve(obj) {
                return _database2.default.models.category.findById(obj.categoryId);
            }
        }
    },
    interfaces: [nodeInterface]
});

var GraphQLBrandType = exports.GraphQLBrandType = new _graphql.GraphQLObjectType({
    name: 'BrandType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('BrandType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLModelType = exports.GraphQLModelType = new _graphql.GraphQLObjectType({
    name: 'ModelType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ModelType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } },
        brand: {
            type: GraphQLBrandType,
            resolve: function resolve(obj) {
                return _database2.default.models.brand.findById(obj.brandId);
            }
        },
        domains: {
            type: new _graphql.GraphQLList(GraphQLDomainType),
            resolve: function resolve(obj) {
                return obj.getDomains();
            }
        },
        subCategories: {
            type: new _graphql.GraphQLList(GraphQLSubCategoryType),
            resolve: function resolve(obj) {
                return obj.getSubCategories();
            }
        }
    },
    interfaces: [nodeInterface]
});

var GraphQLCommentType = exports.GraphQLCommentType = new _graphql.GraphQLObjectType({
    name: 'ItemCommentType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ItemCommentType'),
        text: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.text;
            } },
        createdAt: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.createdAt;
            } },
        updatedAt: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.updatedAt;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLStateType = exports.GraphQLStateType = new _graphql.GraphQLObjectType({
    name: 'StateType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('StateType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        severity: { type: _graphql.GraphQLInt, resolve: function resolve(obj) {
                return obj.severity;
            } }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'ItemCommentType',
    nodeType: GraphQLCommentType
});

var ItemCommentConnection = _connectionDefinition.connectionType;

var _connectionDefinition2 =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'EventCommentsType',
    nodeType: GraphQLCommentType
});

var EventCommentsConnection = _connectionDefinition2.connectionType;
var GraphQLItemType = exports.GraphQLItemType = new _graphql.GraphQLObjectType({
    name: 'ItemType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ItemType'),
        model: {
            type: GraphQLModelType,
            resolve: function resolve(obj) {
                return _database2.default.models.model.findById(obj.modelId);
            }
        },
        reference: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.reference;
            }
        },
        state: {
            type: GraphQLStateType,
            resolve: function resolve(obj) {
                return _database2.default.models.state.findById(obj.stateId);
            }
        },
        isInStock: {
            type: _graphql.GraphQLBoolean,
            resolve: function resolve(obj) {
                return obj.isInStock;
            }
        },
        comments: {
            type: ItemCommentConnection,
            args: _extends({}, _graphqlRelay.connectionArgs),
            resolve: function resolve(obj, _ref) {
                var args = _objectWithoutProperties(_ref, []);

                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getComments(), args);
            }
        }
    },
    interfaces: [nodeInterface]
});

var GraphQLCartType = exports.GraphQLCartType = new _graphql.GraphQLObjectType({
    name: 'CartType',
    description: 'It display item selected in a cart',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('CartType'),
        count: {
            type: _graphql.GraphQLInt,
            resolve: function resolve(obj) {
                return obj.length;
            }
        },
        selectedItems: {
            type: new _graphql.GraphQLList(GraphQLItemType),
            resolve: function resolve(obj) {
                return obj;
            }
        }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition3 =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'EventItemsType',
    nodeType: GraphQLItemType
});

var EventItemsConnection = _connectionDefinition3.connectionType;

var _connectionDefinition4 =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'EventItemsType',
    nodeType: GraphQLItemType
});

var EventItemsConnection = _connectionDefinition4.connectionType;
var EventType = exports.EventType = new _graphql.GraphQLObjectType({

    name: 'EventType',
    description: 'It represents an event',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('EventType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } },
        startDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.startDate;
            } },
        endDate: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.endDate;
            } },
        comments: {
            type: EventCommentsConnection,
            args: _extends({}, _graphqlRelay.connectionArgs),
            resolve: function resolve(obj, _ref2) {
                var args = _objectWithoutProperties(_ref2, []);

                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getComments(), args);
            }
        },
        reservedItems: {
            type: EventItemsConnection,
            args: _extends({}, _graphqlRelay.connectionArgs),
            resolve: function resolve(obj, _ref3) {
                var args = _objectWithoutProperties(_ref3, []);

                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getItems(), args);
            }
        }
    },
    interfaces: [nodeInterface]
});

var UserType = exports.UserType = new _graphql.GraphQLObjectType({
    name: 'UserType',
    description: 'It display the information related to an user',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('UserType'),
        firstName: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.firstName;
            }
        },
        lastName: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.lastName;
            }
        },
        login: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.login;
            }
        },
        email: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.email;
            }
        },
        enabled: {
            type: _graphql.GraphQLBoolean,
            resolve: function resolve(obj) {
                return obj.enabled;
            }
        }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition5 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'ItemType',
    nodeType: GraphQLItemType
});

var ItemsConnection = _connectionDefinition5.connectionType;
var GraphQLItemEdge = _connectionDefinition5.edgeType;
exports.ItemsConnection = ItemsConnection;
exports.GraphQLItemEdge = GraphQLItemEdge;

var _connectionDefinition6 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'ModelType',
    nodeType: GraphQLModelType
});

var ModelsConnection = _connectionDefinition6.connectionType;
var GraphQLModelEdge = _connectionDefinition6.edgeType;
exports.ModelsConnection = ModelsConnection;
exports.GraphQLModelEdge = GraphQLModelEdge;

var _connectionDefinition7 = (0, _graphqlRelay.connectionDefinitions)({
    name: 'EventType',
    nodeType: EventType
});

var EventsConnection = _connectionDefinition7.connectionType;
var EventsEdge = _connectionDefinition7.edgeType;
exports.EventsConnection = EventsConnection;
exports.EventsEdge = EventsEdge;
var GraphQLViewer = exports.GraphQLViewer = new _graphql.GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            id: (0, _graphqlRelay.globalIdField)('Viewer'),
            user: {
                type: UserType,
                resolve: function resolve(obj) {
                    return obj;
                }
            },
            items: {
                type: ItemsConnection,
                args: _extends({}, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, _ref4) {
                    var args = _objectWithoutProperties(_ref4, []);

                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.item.findAll(), args);
                }
            },
            item: {
                type: GraphQLItemType,
                args: {
                    reference: {
                        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                    }
                },
                resolve: function resolve(_, _ref5) {
                    var reference = _ref5.reference;
                    return _database2.default.models.item.findOne({ where: { reference: reference } }).then(function (response) {
                        return response;
                    });
                }
            },
            events: {
                type: EventsConnection,
                args: _extends({
                    date: {
                        type: _graphql.GraphQLString
                    }
                }, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, _ref6) {
                    var date = _ref6.date;

                    var args = _objectWithoutProperties(_ref6, ['date']);

                    console.log("date : " + JSON.stringify(date));

                    var date = (0, _moment2.default)(date, "YYYY-MM-DD");

                    var beginOfMonth = (0, _moment2.default)(date.format("YYYY-MM") + "-01", "YYYY-MM-DD").format();
                    var endOfMonth = (0, _moment2.default)(date.format("YYYY-MM") + "-" + date.daysInMonth(), "YYYY-MM-DD").format();

                    var queryArgs = date != null ? { where: { startDate: { gte: beginOfMonth, $lte: endOfMonth } } } : null;

                    console.log("queryArgs : " + JSON.stringify(queryArgs));
                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.event.findAll(queryArgs), args);
                }
            },
            brands: {
                type: new _graphql.GraphQLList(GraphQLBrandType),
                resolve: function resolve() {
                    return _database2.default.models.brand.findAll().then(function (response) {
                        return response;
                    });
                }
            },
            models: {
                type: ModelsConnection,
                args: _extends({}, _graphqlRelay.connectionArgs),
                resolve: function resolve(_, _ref7) {
                    var args = _objectWithoutProperties(_ref7, []);

                    return (0, _graphqlRelay.connectionFromPromisedArray)(_database2.default.models.model.findAll(), args);
                }
            },
            domains: {
                type: new _graphql.GraphQLList(GraphQLDomainType),
                resolve: function resolve() {
                    return _database2.default.models.domain.findAll().then(function (response) {
                        return response;
                    });
                }
            },
            subCategories: {
                type: new _graphql.GraphQLList(GraphQLSubCategoryType),
                resolve: function resolve() {
                    return _database2.default.models.subCategory.findAll().then(function (response) {
                        return response;
                    });
                }
            },
            categories: {
                type: new _graphql.GraphQLList(GraphQLCategoryType),
                resolve: function resolve() {
                    return _database2.default.models.category.findAll().then(function (response) {
                        return response;
                    });
                }
            },
            states: {
                type: new _graphql.GraphQLList(GraphQLStateType),
                resolve: function resolve() {
                    return _database2.default.models.state.findAll().then(function (response) {
                        return response;
                    });
                }
            },
            countNextItemId: {
                type: _graphql.GraphQLInt,
                args: {
                    itemReference: {
                        type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                    }
                },
                resolve: function resolve(functionToRetrievedViewerFromCache, _ref8) {
                    var itemReference = _ref8.itemReference;


                    var searchKey = itemReference + '%';
                    return _database2.default.models.item.count({ where: { reference: { $like: searchKey } } }).then(function (response) {
                        return response + 1;
                    });
                }
            },
            cart: {
                type: GraphQLCartType,
                resolve: function resolve(user) {
                    return (0, _CartStore.getCart)(user.id);
                }
            }
        };
    },
    interfaces: [nodeInterface]
});

var GraphQLRoot = exports.GraphQLRoot = new _graphql.GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: GraphQLViewer,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
                }
            },
            resolve: function resolve(root, _ref9) {
                var viewerId = _ref9.viewerId;
                return _database2.default.models.user.findOne({ where: { id: viewerId } });
            }
        },
        node: nodeField
    }
});