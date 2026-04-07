import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { TuiLink } from "@taiga-ui/core/components/link";

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  standalone: true,
  imports: [TuiLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  @Input({ required: true }) text: string = 'Link works';
  @Input({ required: true }) url: string = '';
}