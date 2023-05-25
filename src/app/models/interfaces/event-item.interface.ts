import * as moment from "moment"; 


export interface EventItem {
    date: moment.Moment
    duration?: moment.Duration
    type?: 'ordinary' | 'holiday'
    description?: string
}