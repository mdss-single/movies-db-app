import { Pipe, PipeTransform } from '@angular/core';

type Options = {
  field: string;
  negative?: boolean;
  value: string;
}

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {
  transform(arr: any[], options: Options): any[] {
    if (!arr) {
      return arr;
    }

    if (options.negative) {
      return arr.filter(item => item[options.field] !== options.value);
    }

    return arr.filter(item => item[options.field] === options.value);
  }

}
