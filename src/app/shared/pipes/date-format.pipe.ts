import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any): string | null {
    if (value.seconds && value.nanoseconds) {
      let newDate = new Date(value.seconds * 1000 + value.nanoseconds / 1000000);
      let tzoffset = newDate.getTimezoneOffset() * 60000;
      let localISOTime = (new Date(newDate.getTime() - tzoffset)).toISOString();
      return localISOTime.split('.')[0].replace('T', ' ');
    }
    return null;
  }
}
