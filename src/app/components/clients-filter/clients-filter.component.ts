import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-clients-filter',
  standalone: false,
  templateUrl: './clients-filter.component.html',
  styleUrl: './clients-filter.component.scss'
})
export class ClientsFilterComponent {
  protected clientsForm = new FormGroup({
    client: new FormControl(null),
  })
}
