import { Component, Inject, Injector, Input, OnInit } from '@angular/core';
import { Client } from '../../models/client';
import { DialogComponent } from '../dialog/dialog.component';
import { TuiButtonModule, TuiDialogService } from '@taiga-ui/core';

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
  title='client';

  constructor(
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {
  }

  ngOnInit() {
    console.log(this.client);
  }
}
