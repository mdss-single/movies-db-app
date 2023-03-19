import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rating',
  standalone: true
})
export class RatingPipe implements PipeTransform {
  transform(number: number | undefined): number {
    if (!number) {
      return 0;
    }

    return Math.round(number / 10 * 100);
  }
}
