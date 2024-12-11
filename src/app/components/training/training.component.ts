import { IClient } from './../../interfaces/client';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiDialogContext, TuiScrollbarModule } from '@taiga-ui/core';
import { tuiCreateTimePeriods, TuiInputTimeModule } from '@taiga-ui/kit';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ITrainingDialog } from 'src/app/interfaces/training_dialog';
import { ClientsService } from '../clients/clients.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiScrollbarModule, TuiButtonModule, TuiInputTimeModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  private isPlanning: boolean = false;
  readonly trainingForm = new FormGroup({
    time: new FormControl(null),
  });
  timeSlots = tuiCreateTimePeriods(11, 21);
  clients!: IClient[];

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, ITrainingDialog>,
    private _clientsService: ClientsService
  ) {
    this.isPlanning = context?.data?.isPlanning;
    _clientsService.getClients().subscribe();
    _clientsService.clients$.subscribe(val => console.log(val)
    )
  }

  ngOnInit() {
    console.log(this.context);

  }

  onSubmit(): void {
    console.log(this.trainingForm.controls.time.value);
  }
}
