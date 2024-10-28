import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit, OnChanges {
  public value: TuiDay | null = null;

  constructor(private _schedulerService: SchedulerConfigService, private loader: LoaderService) {
    console.log('constructor started');
    loader.show();
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
    this._schedulerService.openModal();
  }
}