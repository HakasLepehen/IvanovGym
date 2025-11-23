import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformMinutes',
  standalone: true,
})
export class TransformMinutesPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return value.toString().concat('0');
    }
    return value.toString();
  }
}
