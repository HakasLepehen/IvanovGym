import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit, OnChanges {
  public value: TuiDay | null = null;

  constructor() {
    console.log('constructor started');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges started');
  }

  ngOnInit() {
    console.log('ngOnInit started');
  }

  public onDayClick(day: TuiDay | any): void {
    this.value = day;
    console.log(this.value);
  }

  public addTraining() {
    console.log(this.value);
  }
}