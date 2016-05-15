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
    
    return Database.models.event.findAll(args)
        .then(event => {
            if(event.length > 0) {
                return false
            }
            return true
        });    
}