import { ChangeDetectionStrategy, Component, Input, OnChanges, signal, SimpleChange, SimpleChanges, WritableSignal } from '@angular/core';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loader',
  template: `
    <tui-loader 
      [showLoader]="showLoader"
      [inheritColor]="inheritColor"
      [overlay]="overlay"
      [size]="size"
      [textContent]="message"
    >
      <ng-content></ng-content>
    </tui-loader>
  `,
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent implements OnChanges {
  @Input() showLoader = true;
  @Input() inheritColor = false;
  @Input() overlay = true;
  @Input() size: 's' | 'm' | 'l' | 'xl' = 'xl';
  message: WritableSignal<string>;

  constructor(private loaderService: LoaderService) {
    this.message = this.loaderService.message;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes) {
      for (const key in changes) {
        switch (key) {
          case 'inheritColor':
            this.inheritColor = changes[`${key}`].currentValue
            break;
          case 'overlay':
            this.overlay = changes[`${key}`].currentValue
            break;
          case 'size':
            this.size = changes[`${key}`].currentValue
            break;
        }
      }
    }
  }
}
