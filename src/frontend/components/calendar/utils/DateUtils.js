import moment from 'moment'

export function getFirstDayOfMonth(date, format) {

    let year = moment(date).year();
    let month = moment(date).month();
    let startDate = moment([year, month]);
    
    return format ? startDate.format(format) : startDate;
}
