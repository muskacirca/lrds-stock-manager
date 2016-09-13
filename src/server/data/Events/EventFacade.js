import Database from '../database'
import moment from 'moment'

export function isItemInStock(eventIds) {

    let now = moment().format("YYYY-MM-DDTHH-mm-ss.SSSZ");
    let args = {
        where: {
            $and: [
                {id: {$in: eventIds}},
                {startDate: {$lte: now}},
                {endDate: {$gte: now}}
            ]
        },
        attributes: ['id']
    }

    return Database.models.event.findAll(args).then(event => event.length <= 0);
}
