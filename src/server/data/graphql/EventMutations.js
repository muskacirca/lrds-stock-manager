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
    EventCommentEdge,
    GraphQLCartType,
    GraphQLItemType,
    EventCommentsConnection
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
            resolve: (args) => emptyCart(args.userId)
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
                reservedItems.forEach(reference => {
                    Database.models.item.findOne({where: {reference: reference}}).then(item => {
                        return event.addItem(item)
                    })
                })
                
                return event
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
        comments: {
            type: EventCommentsConnection,
            resolve: (obj) => connectionFromPromisedArray(obj.event.getComments())
        },
        commentEdge: {
            type: EventCommentEdge,
            resolve: (obj) => {
                return obj.event.getComments()
                    .then(r => {
                        var cursor = cursorForObjectInConnection(r, obj.comment);
                        return {
                            cursor: cursor,
                            node: obj.comment
                        }
                    })
            }
        }
    },
    mutateAndGetPayload: ({text, author, eventId}) => {

        return Database.models.event.findOne({where: {id: eventId}})
            .then(event => {
                return event.createComment({text: text, author: author})
                    .then(c => {
                        return {
                            event: event,
                            comment: c
                        }
                    })


            })
    }
});
