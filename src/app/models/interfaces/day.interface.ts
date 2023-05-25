import { EventItem } from "./event-item.interface"

export interface Day {
    isToday?: boolean
    month: string
    date: string
    year: string
    eventList?: EventItem[] 
  }