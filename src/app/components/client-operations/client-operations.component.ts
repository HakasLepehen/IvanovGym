import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { DialogComponent } from '../dialog/dialog.component';
import { TuiButtonModule, TuiDialogContext, TuiDialogService, TuiErrorModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import IClientDialog from '../../interfaces/client-dialog.interface';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { ClientsService } from '../../services/clients/clients.service';

@Component({
  selector: 'app-client-operations',
  standalone: true,
  imports: [
    DialogComponent,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiInputNumberModule
  ],
  providers: [
    TuiDialogService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Это поле является обязательным и не должно быть пустым'
      }
    }
  ],
  templateUrl: './client-operations.component.html',
  styleUrls: ['./client-operations.component.scss']
})
export class ClientOperationsComponent implements OnInit {
  public canEdit: boolean = false;
  public client!: Client;

  clientForm!: FormGroup;

  constructor(
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, IClientDialog>,
    private cs: ClientsService
  ) {
  }

  ngOnInit() {
    this.canEdit = this.context.data.isEdit;
    this.client = this.context.data.client;
    this.clientForm = new FormGroup({
      id: new FormControl(this.client.id),
      fullName: new FormControl(this.client.fullName, Validators.required),
      age: new FormControl(this.client.age, Validators.required),
      target: new FormControl(this.client.target, Validators.required),
      limits: new FormControl(this.client.limits),
      experience: new FormControl(this.client.experience),
      sleep: new FormControl(this.client.sleep),
      food: new FormControl(this.client.food),
      pharma: new FormControl(this.client.pharma),
      activity: new FormControl(this.client.activity)
    });
  }

  onSubmit() {
    console.log('onSubmit', this.clientForm.value);
    if (!this.canEdit) {
      return this.cs.addClient(this.clientForm.value)
        .then(_ => this.context.completeWith(true))
        .catch((error: string) => {
          alert(error);
        });
    }
    return this.cs.editClient(this.clientForm.value)
      .then(_ => this.context.completeWith(true))
      .catch((error: string) => {
        alert(error);
      });
  }
}
