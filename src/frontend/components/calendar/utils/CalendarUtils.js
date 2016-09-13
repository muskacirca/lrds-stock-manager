import moment from 'moment'

const WORK_HOURS = 8 * 60;

export function computeFreeTime(dateOfTheDay, events) {

    var remainingWorkHours = WORK_HOURS;
    events.forEach(event => {

        let startTime = event.node.startDate;
        let endTime = event.node.endDate;

        let duration = computeDuration(startTime, endTime)
        remainingWorkHours = remainingWorkHours - duration;

    });
    
    if (remainingWorkHours > 5 * 60) {
        return ""
    } else if(remainingWorkHours <= 0) {
        return "FULLY BOOKED"
    } else {
        return "please call"
    }
}


export function computeDuration(start, end) {
    return moment(end).diff(start, "minutes");
}
