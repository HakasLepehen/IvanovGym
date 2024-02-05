import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent {
  address = this.fb.group({
    street: [''],
    city: [''],
  });

  profile = this.fb.group({
    firstName: [''],
    lastName: [''],
    aliases: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {

  }

  get aliases() {
    return this.profile.get('aliases') as FormArray;
  }

  add(): void {
    this.aliases.push(this.fb.control(this.address));
    console.log(this.aliases);
  }

  getControl(i: number): any {
    return this.aliases.at(i);
  }
}
