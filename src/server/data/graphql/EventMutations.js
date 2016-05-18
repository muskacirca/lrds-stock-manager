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
    fromGlobalId
} from 'graphql-relay'

import Database from '../database'

import {
    GraphQLViewer,
    EventsEdge,
    EventCommentEdge,
    GraphQLCartType,
    EventType
} from './Model'

import {
    emptyCart,
} from '../stores/CartStore';


import {
    getViewer,
} from '../stores/UserStore';


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
            resolve: (obj) => {
                console.log("In EventMutation output field viewer : " + JSON.stringify(obj.viewerId))
                return getViewer(obj.viewerId)
            }
        },
        cart: {
            type: GraphQLCartType,
            resolve: (obj) => emptyCart(obj.viewerId)
        },
        eventEdge: {
            type: EventsEdge,
            resolve: (obj) => {

                return Database.models.event.findAll()
                    .then(events => {

                        let eventToPass
                        for (const event of events) {
                            if (event.id === obj.event.id) {
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
    mutateAndGetPayload: ({name, startDate, endDate, description, reservedItems, userId}) => {

        var event = {
            name: name,
            startDate: startDate,
            endDate: endDate,
            description: description
        }
        
        return Database.models.event.create(event)
            .then(event => {
                reservedItems.forEach(reference => {
                    Database.models.item.findOne({where: {reference: reference}}).then(item => {
                        return event.addItem(item)
                    })
                })
                
                return {
                    viewerId : userId,
                    event: event
                }
            })
    }
});

export const AddEventCommentMutation = new mutationWithClientMutationId({
    name: 'AddEventComment',
    description: 'Function to add a comment to an event',
    inputFields: {
        text: {type: new GraphQLNonNull(GraphQLString)},
        author: {type: new GraphQLNonNull(GraphQLString)},
        eventId: {type: new GraphQLNonNull(GraphQLString)}
    },
    outputFields: {
        event: {
            type: EventType,
            resolve: (obj) => obj.event
        }
    },
    mutateAndGetPayload: ({text, author, eventId}) => {

        
        return Database.models.event.findOne({where: {id: fromGlobalId(eventId).id}})
            .then(event => {
                return event.createComment({text: text, author: author})
                    .then(c => {
                        console.log("return of create comment " + JSON.stringify(c))
                        return {
                            event: event,
                            comment: c
                        }
                    })


            })
    }
});

export const ExportEventToPdfMutation = new mutationWithClientMutationId({
    name: 'ExportEventToPdf',
    description: 'Export an event to pdf',
    inputFields: {
        eventId: {type: new GraphQLNonNull(GraphQLString)},
    },
    outputFields: {
        output: {
            type: GraphQLString,
            resolve: (obj) => obj.event
        }
    },
    mutateAndGetPayload: ({eventId}) => {

        return Database.models.event.findOne({where: {id: fromGlobalId(eventId).id}})
            .then(event => {
                

            })
    }
});






