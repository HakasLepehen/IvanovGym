import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { DialogComponent } from '../dialog/dialog.component';
import { TuiButtonModule, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import IClientDialog from '../../interfaces/client-dialog.interface';

@Component({
  selector: 'app-client-operations',
  standalone: true,
  imports: [DialogComponent, TuiButtonModule],
  providers: [TuiDialogService],
  templateUrl: './client-operations.component.html',
  styleUrls: ['./client-operations.component.scss']
})
export class ClientOperationsComponent implements OnInit {
  @Input()
  canEdit: boolean = false;
  @Input()
  public client!: Client;
  title = 'client';

  constructor(
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, IClientDialog>
  ) {
  }

  ngOnInit() {
    console.log(this.client);
    this.client = this.context.data.client;
  }

  ok() {
    this.context.completeWith(true);
  }

  cancel() {
    this.context.completeWith(false);
  }
}
