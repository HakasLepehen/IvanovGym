import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiDialogContext, TuiScrollbarModule } from '@taiga-ui/core';
import { tuiCreateTimePeriods, TuiInputTimeModule, tuiItemsHandlersProvider, TuiSelectModule } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { IClient } from '../../interfaces/client';
import { ITrainingDialog } from 'src/app/interfaces/training_dialog';
import {TuiDataListWrapperModule} from '@taiga-ui/kit';
import { Store } from "@ngrx/store";
import { clientsSelector } from "../../store/selectors/client.selector";
import { take } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";
import { TuiDay } from "@taiga-ui/cdk";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiScrollbarModule,
    TuiButtonModule,
    TuiInputTimeModule,
    TuiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule
  ],
  templateUrl: './training.component.html',
  styleUrls: [ './training.component.scss' ],
  providers: [
    tuiItemsHandlersProvider({
      stringify: (client: IClient) => `${client.fullName}`
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  private isPlanning: boolean = false;
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
    private store: Store
  ) {
    this.isPlanning = context?.data?.isPlanning;
    this.selectedDay = context?.data?.selectedDay;
    store.select(clientsSelector)
      .pipe(
        take(1),
        tap(val=> this.clients = val)
      ).subscribe()
  }

  ngOnInit() {
    console.log(this.context);

  }

  onSubmit(): void {
    const selectedDay = this.selectedDay.toLocalNativeDate();
    console.log(this.trainingForm.value);
  }
}
