import { ChangeDetectionStrategy, Component } from '@angular/core';

const DICTIONARY = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Princess Leia' },
  { id: 3, name: 'Darth Vader' },
  { id: 4, name: 'Han Solo' },
  { id: 5, name: 'Obi-Wan Kenobi' },
  { id: 6, name: 'Yoda' },
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestComponent {

}
