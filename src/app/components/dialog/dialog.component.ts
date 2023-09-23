import { Component, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialogContext } from '@taiga-ui/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  constructor(
    // @Inject(POLYMORPHEUS_CONTEXT)
    // private readonly context: TuiDialogContext<boolean>,
  ) {
  }

  // ok() {
  //   this.context.completeWith(true);
  // }
  //
  // cancel() {
  //   this.context.completeWith(false);
  // }
}
