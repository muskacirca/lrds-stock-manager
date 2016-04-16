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
    nodeDefinitions,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    offsetToCursor
} from 'graphql-relay'

import Database from '../database'

import {
    Viewer,
    getById,
    getViewer,
} from '../stores/ItemStore';

import {
    getCart,
} from '../stores/CartStore';

/**
 * The first argument defines the way to resolve an ID to its object.
 * The second argument defines the way to resolve a node object to its GraphQL type.
 */
var { nodeInterface, nodeField } = nodeDefinitions(
    (globalId) => {
        let { id, type } = fromGlobalId(globalId);
        console.log("globalId of " + type + " : " + globalId)
        console.log("id of " + type + " : " + id)
        if (type === 'ItemType') {
            console.log("Im here getting ItemType")
            return getById(id)
        } else if (type === "SubCategoryType") {
            console.log("Im here getting SubCategoryType")
            return getViewer(id);
        } else if (type === "DomainType") {
            console.log("Im here getting Domain")
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

export var GraphQLDomainType = new GraphQLObjectType({
    name: 'DomainType',
    fields: {
        id: globalIdField('DomainType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

export var GraphQLCategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: globalIdField('CategoryType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

export var GraphQLSubCategoryType = new GraphQLObjectType({
    name: 'SubCategoryType',
    fields: {
        id: globalIdField('SubCategoryType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description },
        category: {
            type: GraphQLCategoryType,
            resolve: (obj) => Database.models.category.findById(obj.categoryId)
        }
    },
    interfaces: [nodeInterface]
});

export var GraphQLBrandType = new GraphQLObjectType({
    name: 'BrandType',
    fields: {
        id: globalIdField('BrandType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

export var GraphQLModelType = new GraphQLObjectType({
    name: 'ModelType',
    fields: {
        id: globalIdField('ModelType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description },
        brand: {
            type: GraphQLBrandType,
            resolve: (obj) => {
                return Database.models.brand.findById(obj.brandId)
            }
        },
        domains: {
            type: new GraphQLList(GraphQLDomainType),
            resolve: (obj) => obj.getDomains()
        },
        subCategories: {
            type: new GraphQLList(GraphQLSubCategoryType),
            resolve: (obj) =>  obj.getSubCategories()
        },
    },
    interfaces: [nodeInterface]
});

export var GraphQLItemCommentType = new GraphQLObjectType({
    name: 'ItemCommentType',
    fields: {
        id: globalIdField('ItemCommentType'),
        text: { type: GraphQLString, resolve: (obj) => obj.text},
        createdAt: { type: GraphQLString, resolve: (obj) => obj.createdAt},
        updatedAt: { type: GraphQLString, resolve: (obj) => obj.updatedAt}
    },
    interfaces: [nodeInterface]
});

export var GraphQLStateType = new GraphQLObjectType({
    name: 'StateType',
    fields: {
        id: globalIdField('StateType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        severity: { type: GraphQLInt, resolve: (obj) => obj.severity }
    },
    interfaces: [nodeInterface]
});

var {
    connectionType: ItemCommentConnection
    // ,edgeType: GraphQLSimTypesEdge,
} = connectionDefinitions({
    name: 'ItemCommentType',
    nodeType: GraphQLItemCommentType
});

export var GraphQLItemType = new GraphQLObjectType({
    name: 'ItemType',
    fields: {
        id: globalIdField('ItemType'),
        model: {
            type: GraphQLModelType,
            resolve: (obj) => {
                return Database.models.model.findById(obj.modelId)
            }
        },
        reference: {
            type: GraphQLString,
            resolve: (obj) => obj.reference
        },
        state: {
            type: GraphQLStateType,
            resolve: (obj) => Database.models.state.findById(obj.stateId)
        },
        isInStock: {
            type: GraphQLBoolean,
            resolve: (obj) => obj.isInStock
        },
        comments: {
            type: ItemCommentConnection,
            args: {...connectionArgs},
            resolve: (obj, {...args}) => {
                return connectionFromPromisedArray(obj.getComments(), args)
            }
        }
    },
    interfaces: [nodeInterface]
});

export var GraphQLCartType = new GraphQLObjectType({
    name: 'CartType',
    description: 'It display item selected in a cart',
    fields: {
        id: globalIdField('CartType'),
        count: {
            type: GraphQLInt,
            resolve: (obj) => obj.length
        },
        selectedItems: {
            type: new GraphQLList(GraphQLItemType),
            resolve: (obj) => {
                return obj
            }
        }
    },
    interfaces: [nodeInterface]
});

var {
    connectionType: ItemsConnection
    ,edgeType: GraphQLItemEdge,
} = connectionDefinitions({
    name: 'ItemType',
    nodeType: GraphQLItemType
});

export var {
    connectionType: ModelsConnection
    ,edgeType: GraphQLModelEdge,
} = connectionDefinitions({
    name: 'ModelType',
    nodeType: GraphQLModelType
});

export var GraphQLViewer = new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: globalIdField('Viewer'),
        items: {
            type: ItemsConnection,
            args: {...connectionArgs},
            resolve: (obj, {...args}) => {
                return connectionFromPromisedArray(Database.models.item.findAll(), args)
            }
        },
        item: {
            type: GraphQLItemType,
            args: {
                reference: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (_, {reference}) => Database.models.item.findOne({where: {reference : reference}})
                .then((response) => {
                    return response
                })
        },
        brands: {
            type: new GraphQLList(GraphQLBrandType),
            resolve: () => Database.models.brand.findAll().then((response) => response)
        },
        models: {
            type: ModelsConnection,
            args: {...connectionArgs},
            resolve: (_, {...args}) => {
                return connectionFromPromisedArray(Database.models.model.findAll(), args)
            }
        },
        domains: {
            type: new GraphQLList(GraphQLDomainType),
            resolve: () => Database.models.domain.findAll().then((response) => response)
        },
        subCategories: {
            type: new GraphQLList(GraphQLSubCategoryType),
            resolve: () => Database.models.subCategory.findAll().then((response) => response)
        },
        categories: {
            type: new GraphQLList(GraphQLCategoryType),
            resolve: () => Database.models.category.findAll().then((response) => response)
        },
        states: {
            type: new GraphQLList(GraphQLStateType),
            resolve: () => Database.models.state.findAll().then(response => response)
        },
        countNextItemId: {
            type: GraphQLInt,
            args: {
                itemReference: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (functionToRetrievedViewerFromCache, {itemReference}) => {


                var searchKey = itemReference + '%'
                return Database.models.item.count({where: {reference: {$like: searchKey}}}).then(response => {
                    return response + 1
                })
            }
        },
        cart: {
            type: GraphQLCartType,
            args: {viewerId: {type: new GraphQLNonNull(GraphQLString)}},
            resolve: (obj, {viewerId}) => {
                console.log('cart type resolve: ' + JSON.stringify(getCart(viewerId)))
                return getCart(viewerId)
            }
        }
    }),
    interfaces: [nodeInterface]
});

export var GraphQLRoot = new GraphQLObjectType({
    name: 'Root',
    fields: {
        viewer: {
            type: GraphQLViewer,
            args: {
                viewerId: {
                    name: 'viewerId',
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            resolve: (root, {viewerId}) => Database.models.user.findOne({where: {id: viewerId}}),
        },
        node: nodeField
    }
});

