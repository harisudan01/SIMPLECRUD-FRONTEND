import { Pipe, PipeTransform } from '@angular/core';
/**
 * Custom Date
 */
@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
/**
 * 
 * @param value date returns
 * @returns 
 */
  transform(value:string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = ('0' + date.getUTCDate()).slice(-2); // Get day and pad with leading zero if necessary
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // Get month (0-based index) and pad with leading zero
    const year = date.getUTCFullYear(); // Get full year

    return `${day}/${month}/${year}`;
  }
}
