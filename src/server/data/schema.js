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

var GraphQLDomainType = new GraphQLObjectType({
    name: 'DomainType',
    fields: {
        id: globalIdField('DomainType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

var GraphQLCategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: {
        id: globalIdField('CategoryType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
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
            resolve: (obj) => Database.models.category.findById(obj.categoryId)
        }
    },
    interfaces: [nodeInterface]
});


var GraphQLBrandType = new GraphQLObjectType({
    name: 'BrandType',
    fields: {
        id: globalIdField('BrandType'),
        name: { type: GraphQLString, resolve: (obj) => obj.name},
        description: { type: GraphQLString, resolve: (obj) => obj.description }
    },
    interfaces: [nodeInterface]
});

var GraphQLModelType = new GraphQLObjectType({
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



var GraphQLItemCommentType = new GraphQLObjectType({
    name: 'ItemCommentType',
    fields: {
        id: globalIdField('ItemCommentType'),
        text: { type: GraphQLString, resolve: (obj) => obj.text},
        createdAt: { type: GraphQLString, resolve: (obj) => obj.createdAt},
        updatedAt: { type: GraphQLString, resolve: (obj) => obj.updatedAt}
    },
    interfaces: [nodeInterface]
});

var GraphQLStateType = new GraphQLObjectType({
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

var GraphQLItemType = new GraphQLObjectType({
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

var {
    connectionType: ItemsConnection
     ,edgeType: GraphQLItemEdge,
    } = connectionDefinitions({
    name: 'ItemType',
    nodeType: GraphQLItemType
});

var {
    connectionType: ModelsConnection
     ,edgeType: GraphQLModelEdge,
    } = connectionDefinitions({
    name: 'ModelType',
    nodeType: GraphQLModelType
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
        }
        ,
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
                console.log("search key:  " + JSON.stringify(searchKey))
                console.log("function:  " + JSON.stringify(functionToRetrievedViewerFromCache))
                return Database.models.item.count({where: {reference: {$like: searchKey}}}).then(response => {
                    console.log("retrieved count:  " + JSON.stringify(response))
                    return response + 1
                })
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

const GraphQLAddModelMutation = new mutationWithClientMutationId({
    name: 'AddModel',
    description: 'Function to create model',
    inputFields: {
        brandName: {
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        modelEdge: {
            type: GraphQLModelEdge,
            resolve: ({id}) => {

                return Database.models.model.findAll()
                    .then(dataModels => {
                        return Database.models.model.findById(id)
                            .then(dataModel =>  {
                                console.log("retrieved model after add item: " + JSON.stringify(dataModel))

                                let itemToPass
                                for (const i of dataModels) {
                                    if (i.id === dataModel.id) {
                                        itemToPass = i;
                                    }
                                }
                                console.log("itemToPass : " + JSON.stringify(itemToPass))
                                var cursor = cursorForObjectInConnection(dataModels, itemToPass);
                                console.log("cursor : " + JSON.stringify(cursor))
                                return {
                                    cursor: cursor,
                                    node: itemToPass
                                }
                            })
                    })
            }
        }


    },
    mutateAndGetPayload: ({brandName, name}) => {

        return Database.models.brand.findOrCreate({where: {name: brandName}})
            .spread((brand, wasCreated) => { // spread is necessary when multiple return value

                return Database.models.model.create({name: name, brandId: brand.id})
                    .then((model) => {
                        console.log("return of add item: " + JSON.stringify(model))
                        return {
                            model: {
                                name: model.name,
                                brand: {name: brand.name}
                            },
                            id: model.id

                        }
                    })

            })
    }
})

const AddItemMutation = mutationWithClientMutationId({
    name: 'AddItem',
    description: 'A function to create an item',
    inputFields: {
        modelName: {type: new GraphQLNonNull(GraphQLString)},
        severity: {type: new GraphQLNonNull(GraphQLString)},
        domains: {type: new GraphQLList(GraphQLString)},
        subCategories: {type: new GraphQLList(GraphQLString)}
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        itemEdge: {
            type: GraphQLItemType,
            resolve: (response) => {
                return response
            }
        }
    },
    mutateAndGetPayload: ({modelName, severity, domains, subCategories}) => {

        return Database.models.model.findOne({where: {name: modelName}})
            .then(model => {

                domains.forEach(domain => {

                    Database.models.domain.findOrCreate({where: {name: domain}})
                        .then(domain => {
                            console.log("domain to create : " + JSON.stringify(domain))
                            model.addDomain(domain[0])
                        })
                })

                subCategories.forEach(subCategory => {

                    Database.models.subCategory.findOne({where: {name: subCategory}})
                        .then(retrievedSubCategory => {
                            console.log("subCategory to create : " + JSON.stringify(retrievedSubCategory))
                            model.addSubCategory(retrievedSubCategory)
                        })
                })


                console.log("model : " + JSON.stringify(model))

                return Database.models.brand.findById(model.brandId)
                    .then(brand => {

                        var brandName = brand.name.replace(/ /g,'').substring(0, 4);
                        var modelName = model.name.replace(/ /g,'').substring(0, 4);
                        var reference = brandName.toUpperCase() + modelName.toUpperCase()

                        return Database.models.item.count({where: {reference: {$like: reference + '%'}}})
                            .then(id => {
                                var nextId = id + 1
                                reference = reference  + "-" + nextId
                                console.log("createReference: " + reference)

                                return Database.models.state.findOne({where: {severity: severity}})
                                    .then(state => {
                                        console.log("found state: " + JSON.stringify(state))
                                        return model.createItem({stateId: state.id, reference: reference})
                                            .then(item => {
                                                return item
                                            })
                                    })
                            })
                    })



            })
    }
})

var Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addModel: GraphQLAddModelMutation,
        addItem: AddItemMutation
    }
});

export var Schema = new GraphQLSchema({
    query: GraphQLRoot,
    mutation: Mutation
});
