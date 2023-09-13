import { Component, Inject, Injector } from '@angular/core';
import { Client } from '../../models/client';
import { DialogComponent } from '../dialog/dialog.component';
import { TuiButtonModule, TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-client-ops',
  standalone: true,
  imports: [DialogComponent, TuiButtonModule],
  providers: [TuiDialogService],
  templateUrl: './client-ops.component.html',
  styleUrls: ['./client-ops.component.scss']
})
export class ClientOpsComponent {
  public client: Client = new Client('Новый клиент');
  title='client';

  constructor(
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService
  ) {
  }
}
