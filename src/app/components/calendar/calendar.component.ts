import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { CalendarService } from 'src/app/services/calendar.service';
import { Day } from 'src/app/models/interfaces/day.interface'
import { DayOfWeek } from 'src/app/models/interfaces/day-of-week.interface'
import { MatDialog } from '@angular/material/dialog';
import { DayDetailPopupComponent } from '../day-detail-popup/day-detail-popup.component';


const weeks: DayOfWeek[] = []

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<DayOfWeek>;
  monthSelector: string;
  yearSelector: string;
  displayedColumns: string[] = ['monday', 'tuesday', 'wedsday', 'thursday', 'friday', 'saturday', 'sunday'];
  dataSource = weeks;
  openDayDetail = false

  constructor(private calendarService: CalendarService, public dialog: MatDialog) {
    this.monthSelector = this.calendarService.currentDateSubject.value.format('MMMM')
    this.yearSelector = this.calendarService.currentDateSubject.value.format('YYYY')
  }

  ngOnInit(): void {
    this.calendarService.currentDateSubject.subscribe(this.setWeeksList.bind(this))
  }


  changeDate(value: any, type: any) {
    this.calendarService.changeDate(value, type)
    this.monthSelector = this.calendarService.currentDateSubject.value.format('MMMM')
    this.yearSelector = this.calendarService.currentDateSubject.value.format('YYYY')
  }

  setWeeksList(currentDateValue: any) {
    weeks.length = 0
    const maxDaysPerPage = 42
    const startOf = currentDateValue.clone().startOf('month').startOf('isoWeek').subtract(1, 'day')
    const endOf = currentDateValue.clone().endOf('month').endOf('isoWeek')
    for (let index = 0; index < maxDaysPerPage; index++) {
      if (!startOf.clone().add(1, 'day').isBefore(endOf)) break
      if (index % 7 === 0) {
        const weekInstance: DayOfWeek = {
          monday: { date: '', month: '', year: '' },
          tuesday: { date: '', month: '', year: '' },
          wedsday: { date: '', month: '', year: '' },
          thursday: { date: '', month: '', year: '' },
          friday: { date: '', month: '', year: '' },
          saturday: { date: '', month: '', year: '' },
          sunday: { date: '', month: '', year: '' }
        }
        Object.keys(weekInstance).forEach(element => {
          const day = startOf.add(1, 'day').clone()
          const istoday =
            day.isSame(this.calendarService.dateNow, 'date') &&
            day.isSame(this.calendarService.dateNow, 'month') &&
            day.isSame(this.calendarService.dateNow, 'year')
          weekInstance[element as keyof DayOfWeek].date = day.format('D')
          weekInstance[element as keyof DayOfWeek].month = day.format('MMMM').toLowerCase()
          weekInstance[element as keyof DayOfWeek].year = day.format('YYYY')
          istoday ? weekInstance[element as keyof DayOfWeek].isToday = istoday : undefined
        });
        weeks.push(weekInstance)
      }
    }
    if (this.table) this.table.renderRows()
  }

  openDialog(dayElement: Day): void {
    const dialogRef = this.dialog.open(DayDetailPopupComponent, {
      width: '45rem', 
      data: dayElement
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

}

