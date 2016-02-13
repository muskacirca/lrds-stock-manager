import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLFloat,
    GraphQLString,
    GraphQLBoolean,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} from 'graphql'

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromPromisedArray,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions
} from 'graphql-relay'

import Database from './database'

import {
    Item,
    Viewer,
    SubCategory,
    Domain,
    initState,
    getById,
    getSubCategoryById,
    getViewer,
    getItems,
    pushItem,
    isInitialized
} from './ItemStore';

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        let { id, type } = fromGlobalId(globalId);
        if (type === 'ItemType') {
            console.log("Im here getting ItemType")
            return getById(id)
        } else if (type === "SubCategoryType") {
            console.log("Im here getting SubCategoryType")
            return getViewer(id);
        } else if (type === "DomainType") {
                console.log("Im here getting Domainype")
                return getViewer(id);
        } else if (type === "Viewer") {
            console.log("Im here getting viewer")
            return getViewer(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Item) {
            console.log("getting by object ItemType")
            return GraphQLItemType;
        } else if (obj instanceof SubCategory) {
            console.log("getting by object SubCategoryType")
            return GraphQLItemType
        } else if (obj instanceof Domain) {
            console.log("getting by object SubCategoryType")
            return GraphQLDomainType
        } else if (obj instanceof Viewer) {
            console.log("getting by object ViewerType")
            return GraphQLViewer
        }
    }
);

var GraphQLDomainType = new GraphQLObjectType({
    name: 'DomainType',
    fields: {
        id: globalIdField('DomainType'),
        name: { type: GraphQLString, resolve: (obj) => {

                console.log("obj in domain name resolve: " + JSON.stringify(obj))
                return obj.name
            }
        },
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

var GraphQLCategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: globalIdField('CategoryType'),
        name: { type: GraphQLString, resolve: (obj) => {
            console.log("obj in category name resolve: " + JSON.stringify(obj))
            return obj.name}},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

var GraphQLSubCategoryType = new GraphQLObjectType({
    name: 'SubCategoryType',
    fields: {
        id: globalIdField('SubCategoryType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description },
        category: {
            type: GraphQLCategoryType,
            resolve: (obj) => {
                console.log("obj sub category resolve : " + JSON.stringify(obj))
                return Database.models.category.findById(obj.categoryId)
            }
        }
    },
    interfaces: [nodeInterface]
});

var {
    connectionType: SubCategoryConnection
    // ,edgeType: GraphQLSimTypesEdge,
    } = connectionDefinitions({
    name: 'SubCategoryType',
    nodeType: GraphQLSubCategoryType
});

var GraphQLItemType = new GraphQLObjectType({
    name: 'ItemType',
    fields: {
        id: globalIdField('ItemType'),
        name: {
            type: GraphQLString,
            resolve: (obj) => obj.name
        },
        reference: {
            type: GraphQLString,
            resolve: (obj) => obj.reference
        },
        description: {
            type: GraphQLString,
            resolve: (obj) => obj.description
        },
        isInStock: {
            type: GraphQLBoolean,
            resolve: (obj) => obj.isInStock
        },
        domains: {
            type: new GraphQLList(GraphQLDomainType),
            resolve: (obj) => {

                console.log("domain in itemType: " + JSON.stringify(obj.getDomains()))
                return obj.getDomains()
            }
        },
        subCategories: {
            type: new GraphQLList(GraphQLSubCategoryType),
            resolve: (obj) => {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA AAAAAAAAAAAAAAAAAAA subcategories: " + JSON.stringify(obj.getSubCategories()))
                return obj.getSubCategories()
            }
        },
    },
    interfaces: [nodeInterface]
});

var {
    connectionType: ItemsConnection
    // ,edgeType: GraphQLSimTypesEdge,
    } = connectionDefinitions({
    name: 'ItemType',
    nodeType: GraphQLItemType
});

var GraphQLViewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: globalIdField('Viewer'),
        items: {
            type: ItemsConnection,
            args: {...connectionArgs},
            resolve: (obj, {...args}) => {
                return connectionFromPromisedArray(Database.models.item.findAll(), args)
            }
        }
    }),
    interfaces: [nodeInterface]
});

var GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        node: nodeField
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot
});
