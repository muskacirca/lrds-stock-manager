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
    initState,
    getById,
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
            console.log("Im here")
            return getById(id)
        } else if (type === "Viewer") {
            console.log("Im here getting viewer")
            return getViewer(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Item) {
            return GraphQLItemType;
        } else if (obj instanceof Viewer) {
            return GraphQLViewer
        }
    }
);

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
        }
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
                return connectionFromArray([{
                    "name": "Fireface UC",
                    "reference": "RMEUC01",
                    "description": "un carte son de fou",
                    "isInStock": true
                }], args)
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
