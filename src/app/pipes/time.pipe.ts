import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return `${new Date(value).getHours() < 12 ? 'am' : 'pm'}`;
  }
}
