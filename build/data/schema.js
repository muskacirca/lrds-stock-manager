'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _database = require('./database');

var _database2 = _interopRequireDefault(_database);

var _ItemStore = require('./ItemStore');

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
    if (obj instanceof _ItemStore.Item) {
        console.log("getting by object ItemType");
        return GraphQLItemType;
    } else if (obj instanceof _ItemStore.SubCategory) {
        console.log("getting by object SubCategoryType");
        return GraphQLItemType;
    } else if (obj instanceof _ItemStore.Domain) {
        console.log("getting by object SubCategoryType");
        return GraphQLDomainType;
    } else if (obj instanceof _ItemStore.Viewer) {
        console.log("getting by object ViewerType");
        return GraphQLViewer;
    }
});

var nodeInterface = _nodeDefinitions.nodeInterface;
var nodeField = _nodeDefinitions.nodeField;


var GraphQLDomainType = new _graphql.GraphQLObjectType({
    name: 'DomainType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('DomainType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {

                console.log("obj in domain name resolve: " + JSON.stringify(obj));
                return obj.name;
            }
        },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLCategoryType = new _graphql.GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('CategoryType'),
        name: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                console.log("obj in category name resolve: " + JSON.stringify(obj));
                return obj.name;
            } },
        description: { type: _graphql.GraphQLString, resolve: function resolve(obj) {
                return obj.description;
            } }
    },
    interfaces: [nodeInterface]
});

var GraphQLSubCategoryType = new _graphql.GraphQLObjectType({
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
                console.log("obj sub category resolve : " + JSON.stringify(obj));
                return _database2.default.models.category.findById(obj.categoryId);
            }
        }
    },
    interfaces: [nodeInterface]
});

var GraphQLBrandType = new _graphql.GraphQLObjectType({
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

var GraphQLModelType = new _graphql.GraphQLObjectType({
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

                console.log("domain in itemType: " + JSON.stringify(obj.getDomains()));
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

var GraphQLItemCommentType = new _graphql.GraphQLObjectType({
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

var _connectionDefinition =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'ItemCommentType',
    nodeType: GraphQLItemCommentType
});

var ItemCommentConnection = _connectionDefinition.connectionType;


var GraphQLItemType = new _graphql.GraphQLObjectType({
    name: 'ItemType',
    fields: {
        id: (0, _graphqlRelay.globalIdField)('ItemType'),
        model: {
            type: GraphQLModelType,
            resolve: function resolve(obj) {
                console.log("get model in item : " + JSON.stringify(obj));
                return _database2.default.models.model.findById(obj.modelId);
            }
        },
        reference: {
            type: _graphql.GraphQLString,
            resolve: function resolve(obj) {
                return obj.reference;
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

                console.log("comments in item : " + obj.getComments());
                return (0, _graphqlRelay.connectionFromPromisedArray)(obj.getComments(), args);
            }
        }
    },
    interfaces: [nodeInterface]
});

var _connectionDefinition2 =
// ,edgeType: GraphQLSimTypesEdge,
(0, _graphqlRelay.connectionDefinitions)({
    name: 'ItemType',
    nodeType: GraphQLItemType
});

var ItemsConnection = _connectionDefinition2.connectionType;


var GraphQLViewer = new _graphql.GraphQLObjectType({
    name: 'Viewer',
    fields: function fields() {
        return {
            id: (0, _graphqlRelay.globalIdField)('Viewer'),
            items: {
                type: ItemsConnection,
                args: _extends({}, _graphqlRelay.connectionArgs),
                resolve: function resolve(obj, _ref2) {
                    var args = _objectWithoutProperties(_ref2, []);

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
                resolve: function resolve(obj, _ref3) {
                    var reference = _ref3.reference;

                    return _database2.default.models.item.findOne({ where: { reference: reference } }).then(function (response) {
                        return response;
                    });
                }
            },
            models: {
                type: new _graphql.GraphQLList(GraphQLModelType),
                resolve: function resolve() {
                    return _database2.default.models.model.findAll().then(function (response) {
                        return response;
                    });
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
            }
        };
    },
    interfaces: [nodeInterface]
});

var GraphQLRoot = new _graphql.GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: GraphQLViewer,
            resolve: function resolve() {
                return _ItemStore.getViewer;
            }
        },
        node: nodeField
    }
});

var Schema = exports.Schema = new _graphql.GraphQLSchema({
    query: GraphQLRoot
});