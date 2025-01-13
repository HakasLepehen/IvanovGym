import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit {
  public selectedDay: TuiDay | null = TuiDay.fromLocalNativeDate(new Date(Date.now()));
  public plannedTrainings: any = [];
  public isLoading!: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _schedulerService: SchedulerConfigService,
    private loaderService: LoaderService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.loaderService.getLoading()
      .pipe(
        takeUntil(this.destroy$),
        tap((val: boolean) => {
          this.isLoading = val;
          this.cd.detectChanges();
        })
      )
      .subscribe();
  }

  public onDayClick(day: TuiDay | any): void {
    this.selectedDay = day;
    console.log(this.selectedDay);
  }

  public addTraining() {
    this._schedulerService.openModal(this.selectedDay as TuiDay);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}