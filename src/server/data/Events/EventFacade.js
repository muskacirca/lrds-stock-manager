import Database from '../database'
import moment from 'moment'


export function isItemInStock(eventIds) {

    var now = moment().format("YYYY-MM-DDTHH-mm-ss.SSSZ");
    var args = {
        where: {
            $and: [
                {id: {$in: eventIds}},
                {startDate: {$lte: now}},
                {endDate: {$gte: now}}
            ]
        },
        attributes: ['id']
    }
    
    console.log("retrieving events with args : " + JSON.stringify(args))
    
    return Database.models.event.findAll(args)
        .then(event => {
            console.log("event : " + JSON.stringify(event))
            if(event.length > 0) {
                console.log("found an event")
                return false
            }
            return true
        });    
}