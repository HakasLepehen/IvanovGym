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
import { TuiDay } from "@taiga-ui/cdk";
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';
import { LoaderService } from "../loader/loader.service";

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
  private isPlanning: boolean = false;
  private isEditing: boolean = false;
  private selectedDay!: TuiDay;
  readonly trainingForm = new FormGroup({
    time: new FormControl(null, Validators.required),
    client: new FormControl(null, Validators.required),
  });
  timeSlots = tuiCreateTimePeriods(11, 21);
  clients!: IClient[];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, ITrainingDialog>,
    private store: Store,
    private scheduleConfigService: SchedulerConfigService,
    private loaderService: LoaderService,
  ) {
    this.isPlanning = context?.data?.isPlanning;
    this.selectedDay = context?.data?.selectedDay;
    this.isEditing = context?.data?.isEditing;
    store.select(clientsSelector)
      .pipe(
        take(1),
        tap(val => this.clients = val)
      ).subscribe()
  }

  ngOnInit() {}

  onSubmit(): void {
    const props = {
      selectedDate: this.selectedDay,
      formValue: this.trainingForm.value,
      isCreate: this.isPlanning,
    }
    this.scheduleConfigService.saveTraining(props, this.context);
  }
}
