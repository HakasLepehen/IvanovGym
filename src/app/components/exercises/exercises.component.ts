import { Exercise } from './../../models/exercise';
import { ExercisesService } from './../../services/exercises/exercises.service';
import { Component, Injector, ChangeDetectionStrategy, OnDestroy, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core/';
import { delay, of, tap } from 'rxjs';
import { ExecutionVariant } from 'src/app/models/execution_variant';
import { BodyPart } from 'src/app/modules/body_part/body_part';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';

const ITEMS: readonly any[] = [
  { id: 42, name: 'John Cleese' },
  { id: 237, name: 'Eric Idle' },
  { id: 666, name: 'Michael Palin' },
  { id: 123, name: 'Terry Gilliam' },
  { id: 777, name: 'Terry Jones' },
  { id: 999, name: 'Graham Chapman' },
];

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent implements OnInit, OnDestroy {
  expandedBlock: boolean = false;
  exForm!: FormGroup;
  body_parts: Array<BodyPart> = [];
  list = [1];

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private exService: ExercisesService
  ) {}

  ngOnInit(): void {
    this.exService.body_parts.pipe(tap((val) => (this.body_parts = val))).subscribe();
    this.exService.getBodyParts();
  }

  show(): void {
    this.expandedBlock = !this.expandedBlock;
    const model = new Exercise('', []);
    if (this.expandedBlock) {
      this.exForm = new FormGroup({
        exercise_name: new FormControl(model.exercise_name, [Validators.required]),
        muscle_groups_id: new FormControl(model.muscle_groups_id),
        exec_var: new FormControl()
      });
    }
    const exec = new ExecutionVariant('Упражнение');
  }

  // readonly stringify = (val: BodyPart): string => `${val.part_name}`

  click(e: any) {
    console.log(this.exForm.value);
  }

  onSubmit(): void {}

  ngOnDestroy(): void {
    console.log('меня удалили');
  }

  @tuiPure
  stringify(items: readonly any[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({ id, part_name }) => [id, part_name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}
