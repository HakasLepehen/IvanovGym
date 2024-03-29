import { ClientsConfigService } from './../clients/clients-config.service';
import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { IClient } from '../../interfaces/client';
import { DialogComponent } from '../dialog/dialog.component';
import { TuiButtonModule, TuiDialogContext, TuiDialogService, TuiErrorModule } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import IClientDialog from '../../interfaces/client-dialog';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { AsyncPipe } from '@angular/common';
import { ClientsService } from '../../services/clients/clients.service';
import { TaigaModule } from 'src/app/modules/taiga/taiga.module';

@Component({
  selector: 'app-client-operations',
  standalone: true,
  imports: [
    TaigaModule,
    DialogComponent,
    TuiButtonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    AsyncPipe,
    TuiInputNumberModule,
  ],
  providers: [
    TuiDialogService,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Это поле является обязательным и не должно быть пустым',
      },
    },
  ],
  templateUrl: './client-operations.component.html',
  styleUrls: ['./client-operations.component.scss'],
})
export class ClientOperationsComponent implements OnInit {
  public canEdit: boolean = false;
  public client!: IClient;

  clientForm!: FormGroup;

  constructor(
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, IClientDialog>,
    private cs: ClientsService,
    private clientConfigService: ClientsConfigService
  ) {}

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
      activity: new FormControl(this.client.activity),
    });
  }

  onSubmit() {
    if (!this.canEdit) {
      return this.clientConfigService.addClient(this.clientForm.value, this.context);
    }
    return this.clientConfigService.editClient(this.clientForm.value, this.context);
  }
}
