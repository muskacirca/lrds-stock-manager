import {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString
} from 'graphql'

import {
    connectionArgs,
    mutationWithClientMutationId,
    cursorForObjectInConnection,
    connectionFromPromisedArray,
} from 'graphql-relay'

import Database from '../database'

import {
    GraphQLViewer,
    EventsEdge
} from './Model'

import {
    getViewer,
} from '../stores/ItemStore';


export const AddEventMutation = new mutationWithClientMutationId({
    name: 'AddEvent',
    description: 'Function to add an event',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        startDate: {type: new GraphQLNonNull(GraphQLString)},
        endDate: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        itemsReference: {type: new GraphQLList(GraphQLString)}
        
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        eventEdge: {
            type: EventsEdge,
            resolve: (obj, {id}) => {

                return Database.models.event.findAll()
                    .then(dataModels => {

                        let itemToPass
                        for (const model of dataModels) {
                            if (model.id === obj.id) {
                                itemToPass = model;
                            }
                        }
                        var cursor = cursorForObjectInConnection(dataModels, itemToPass);
                        return {
                            cursor: cursor,
                            node: itemToPass
                        }
                    })
            }
        }
    },
    mutateAndGetPayload: ({name, startDate, endDate, description, itemsReference}) => {

        var event = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description
        }
        
        return Database.models.event.create(event)
            .then(event => { // spread is necessary when multiple return value
                
                itemsReference.forEach(reference => {
                    Database.models.item.findOne({where: {reference: reference}}).then(item => event.addItem(item))
                })
                
                return event
            })
    }
})
