import { Pipe, PipeTransform } from '@angular/core';
import { ITraining } from '../../interfaces/training';

@Pipe({
  name: 'sortByTime',
  standalone: true
})
export class SortByTimePipe implements PipeTransform {

  transform(trainings: ITraining[], ...args: unknown[]): ITraining[] {
    if (!trainings.length) {
      return [];
    }
    return trainings.sort((prev: ITraining, next: ITraining) => {
      if (prev.hour !== next.hour) {
        return prev.hour - next.hour;
      }
      return prev.minutes - next.minutes;
    });
  }

}
