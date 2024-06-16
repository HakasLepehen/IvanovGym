import { Component } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  public value: TuiDay | null = null;

  public onDayClick(day: TuiDay | any): void {
    this.value = day;
    console.log(this.value);
  }

  public addTraining() {
    console.log(this.value);
  }
}