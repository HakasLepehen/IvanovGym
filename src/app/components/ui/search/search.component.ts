import { Component, EventEmitter, inject, input, Output, Signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiTextfield } from '@taiga-ui/core';
import { TuiFilter } from '@taiga-ui/kit';
import { TuiSearch } from '@taiga-ui/layout';
import { ExercisesConfigService } from '../../exercises-main/exercises-config.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, TuiSearch, TuiTextfield, TuiFilter, TuiButton],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  readOnly = input();
  exerciseConfigService: ExercisesConfigService = inject(ExercisesConfigService);
  searchForm: FormGroup = new FormGroup({
    query: new FormControl(''),
    body_parts: new FormControl()
  });
  readonly filters = this.exerciseConfigService.bodyParts.map(part => part.name);
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() submit: EventEmitter<boolean> = new EventEmitter();

  public searchClick(): void {
    const searchValue = this.searchForm.getRawValue();
    this.search.emit(searchValue)
  }

  public submitValue(): void {
    this.submit.emit(true);
  }
}
