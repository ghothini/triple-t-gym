import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return `${new Date(value).getHours() < 10 ? '0' + new Date(value).getHours() : new Date(value).getHours()}:${new Date(value).getMinutes() < 10 ? '0' + new Date(value).getMinutes() : new Date(value).getMinutes()}`;
  }

}
