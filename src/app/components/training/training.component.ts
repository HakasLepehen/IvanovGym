import { TuiInputTimeModule, TuiSelectModule } from "@taiga-ui/legacy";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiDialogContext, TuiDataList, TuiScrollbar, TuiScrollable, TuiButton } from '@taiga-ui/core';
import { tuiCreateTimePeriods, tuiItemsHandlersProvider, TuiDataListWrapper } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { IClient } from '../../interfaces/client';
import { ITrainingDialog } from 'src/app/interfaces/training_dialog';
import { Store } from "@ngrx/store";
import { clientsSelector } from "../../store/selectors/client.selector";
import { take } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { TuiDay, TuiTime } from "@taiga-ui/cdk";
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';
import { LoaderService } from "../loader/loader.service";
import { ITraining } from "src/app/interfaces/training";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiScrollbar, TuiScrollable,
    TuiButton,
    TuiInputTimeModule,
    TuiSelectModule,
    TuiDataList,
    TuiDataListWrapper
  ],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  providers: [
    tuiItemsHandlersProvider({
      stringify: (client: IClient) => `${client.fullName}`
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  public isPlanning: boolean = false;
  private selectedDay!: TuiDay;
  readonly trainingForm = new FormGroup({
    time: new FormControl<string | null>(null, Validators.required),
    client: new FormControl(null, Validators.required),
  });
  timeSlots = tuiCreateTimePeriods(11, 21);
  clients!: IClient[];
  public editingTraining!: ITraining;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, ITrainingDialog>,
    private store: Store,
    private scheduleConfigService: SchedulerConfigService,
    private loaderService: LoaderService,
  ) {
    if (!!context?.data?.training) this.editingTraining = context.data.training;

    this.isPlanning = context?.data?.isPlanning;
    this.selectedDay = context?.data?.selectedDay;
    store.select(clientsSelector)
      .pipe(
        take(1),
        tap(val => this.clients = val)
      ).subscribe()
  }

  ngOnInit() {
    if (!!this.editingTraining) {
      this.trainingForm.controls.time.setValue(
        `${this.editingTraining.hour}:${(this.editingTraining.minutes == 0 ? '00' : this.editingTraining.minutes)}`
      )
    }
  }

  onSubmit(): void {
    const props = {
      selectedDate: this.selectedDay,
      formValue: this.trainingForm.value,
      isCreate: this.isPlanning,
    }
    this.scheduleConfigService.saveTraining(props, this.context);
  }
}
