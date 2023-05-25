import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as moment from 'moment';
 
@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  public currentDateSubject = new BehaviorSubject(moment())
  public dateNow = moment()
  changeDate(value: moment.DurationInputArg1, type: moment.DurationInputArg2) {
    this.currentDateSubject.next(this.currentDateSubject.value.add(value, type))
  }
  setDateSubjectToSelected(date: moment.MomentInput) { 
    this.currentDateSubject.next(moment(date, 'YYYY MMMM DD'))
  }
  getDuration(value: moment.DurationInputArg1, type: moment.DurationInputArg2) {
    console.log(moment.duration(2, 'days'));
    
  }
}
