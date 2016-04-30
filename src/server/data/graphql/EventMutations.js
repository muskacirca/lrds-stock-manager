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
    EventsEdge,
    GraphQLCartType
} from './Model'

import {
    emptyCart,
} from '../stores/ItemStore';


import {
    getViewer,
} from '../stores/CartStore';


export const AddEventMutation = new mutationWithClientMutationId({
    name: 'AddEvent',
    description: 'Function to add an event',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        startDate: {type: new GraphQLNonNull(GraphQLString)},
        endDate: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        reservedItems: {type: new GraphQLList(GraphQLString)},
        userId: {type: new GraphQLNonNull(GraphQLString)},
        
    },
    outputFields: {
        viewer: {
            type: GraphQLViewer,
            resolve: () => getViewer
        },
        cart: {
            type: GraphQLCartType,
            resolve: (args) => {
                console.log("add event cart args : " + JSON.stringify(args))
                return emptyCart(args.userId)
            }
        },
        eventEdge: {
            type: EventsEdge,
            resolve: (obj, {id}) => {

                return Database.models.event.findAll()
                    .then(events => {

                        let eventToPass
                        for (const event of events) {
                            if (event.id === obj.id) {
                                eventToPass = event;
                            }
                        }
                        var cursor = cursorForObjectInConnection(events, eventToPass);
                        return {
                            cursor: cursor,
                            node: eventToPass
                        }
                    })
            }
        }
    },
    mutateAndGetPayload: ({name, startDate, endDate, description, reservedItems}) => {

        var event = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description
        }
        
        return Database.models.event.create(event)
            .then(event => {

                console.log("addEventMutation, reserved items : " + JSON.stringify(reservedItems))
                
                reservedItems.forEach(reference => {
                    Database.models.item.findOne({where: {reference: reference}}).then(item => {
                        console.log("adding item : " + JSON.stringify(item))
                        event.addItem(item)
                    })
                })
                
                return event
            })
    }
})
