import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Day } from '../../models/interfaces/day.interface';
import { CalendarService } from 'src/app/services/calendar.service';
import { EventModel } from 'src/app/models/event.model'
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms'; 
import { DurationTypeList } from 'src/app/models/duration-type.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
@Component({
  selector: 'app-day-detail-popup',
  templateUrl: './day-detail-popup.component.html',
  styleUrls: ['./day-detail-popup.component.scss']
})
export class DayDetailPopupComponent {
  eventForms: FormGroup
  durationTypes = new DurationTypeList().types
  panelOpenState = false;
  title: FormControl
  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public day: Day,
    private calendarService: CalendarService,
    private eventFormBuilder: FormBuilder, 
    private localStorageService: LocalStorageService) { 
    this.calendarService.setDateSubjectToSelected(`${this.day.year}-${this.day.month}-${this.day.date}`)
    this.title = new FormControl('')
    this.eventForms = this.eventFormBuilder.group({
      forms: this.eventFormBuilder.array([ 
      ])
    }
    )   
  }

  onCancelClick(): void {
    this.dialog.closeAll();
  }

  onSaveClick(): void {
  }

  get forms() {
    return this.eventForms.get('forms') as FormArray
  }
  
  addForm() { 
      this.forms.push(this.createEventForm())
      
  } 

  createEventForm(): FormGroup {
    return this.eventFormBuilder.group({
      'title': this.title,
      'type': '',
      'durationNumber': '',
      'durationType': ''
    });
  }

  getCapitalized(month: string) {
    return month.charAt(0).toUpperCase()
      + month.slice(1)
  }
}
