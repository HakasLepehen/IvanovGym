import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  aquaticCreatures = ['shark', 'dolphin', 'octopus'];

  addAquaticCreature(newAquaticCreature: string) {
    this.aquaticCreatures.push(newAquaticCreature);
  }
}
