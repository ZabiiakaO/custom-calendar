import { Moment } from "moment";
import { EventItem } from "./interfaces/event-item.interface";
import * as moment from "moment";

export class EventModel implements EventItem {
    date: Moment;
    duration?: moment.Duration | undefined;
    type: "ordinary" | "holiday";
    description: string;

    constructor({ date, duration, type = 'ordinary', description }: 
    { date: Moment; duration?: string; type?: string; description?: string; }) {
      this.date = moment(date, 'YYYY MMMM DD');
      this.duration = moment.duration(duration);
      this.type = type as "ordinary" | "holiday"
      this.description = description as string
    } 
}