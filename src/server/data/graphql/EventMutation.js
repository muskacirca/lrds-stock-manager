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
        description: {type: GraphQLString}
        
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        eventEdge: {
            type: EventsEdge,
            resolve: (obj, {id}) => {

                console.log("AddModelMutation obj : "  + JSON.stringify(obj))

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
    mutateAndGetPayload: ({name, startDate, endDate, description}) => {

        var event = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description
        }
        
        return Database.models.brand.create(event)
            .spread((event, wasCreated) => { // spread is necessary when multiple return value
                return event
            })
    }
})
