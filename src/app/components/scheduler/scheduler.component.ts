import { Component } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  value: TuiDay | null = null;

  onDayClick(day: TuiDay | any): void {
    this.value = day;
    console.log(this.value);
  }
}