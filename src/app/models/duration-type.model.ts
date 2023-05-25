import { SelectorType } from './interfaces/selector-type.interface'

export class DurationTypeList {
  types: SelectorType[] = [
    { value: 'day', viewValue: 'Day' },
    { value: 'month', viewValue: 'Month' },
    { value: 'year', viewValue: 'Year' },
  ]; 

 
}