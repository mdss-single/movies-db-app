import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(arr: unknown[], callback: (value: any) => boolean): any[] {
    return arr.filter(callback);
  }
}
