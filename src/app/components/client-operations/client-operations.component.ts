import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TUI_DEFAULT_MATCHER, TuiContext, tuiIsNumber, TuiLet } from '@taiga-ui/cdk';
import { TuiButton, TuiDialogContext, TuiDialogService, TuiError } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS, TuiFieldErrorContentPipe, TuiFieldErrorPipe, TuiInputNumber } from '@taiga-ui/kit';
import { TuiInputModule } from "@taiga-ui/legacy";
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map, startWith, switchMap } from 'rxjs/operators';
import IClientExercise from 'src/app/interfaces/client_exercise';
import { TaigaModule } from 'src/app/modules/taiga/taiga.module';
import { IClient } from '../../interfaces/client';
import IClientDialog from '../../interfaces/client-dialog';
import { ClientsConfigService } from './../clients/clients-config.service';

@Component({
  selector: 'app-client-operations',
  standalone: true,
  imports: [
    TaigaModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Это поле является обязательным и не должно быть пустым',
      },
    },
  ],
  templateUrl: './client-operations.component.html',
  styleUrls: ['./client-operations.component.scss'],
})

export class ClientOperationsComponent implements OnInit {
  public canEdit: boolean = false;
  public client!: IClient;
  private readonly search$ = new Subject<string>();
  public limits_control!: FormControl;
  public readonly exercises$: BehaviorSubject<IClientExercise[]> = new BehaviorSubject<IClientExercise[]>([]);
  private context = inject(POLYMORPHEUS_CONTEXT);

  clientForm!: FormGroup;

  constructor(

    // @Inject(POLYMORPHEUS_CONTEXT)
    // private readonly context: TuiDialogContext<boolean, IClientDialog>,
    private clientConfigService: ClientsConfigService,
  ) { }

  ngOnInit() {
    this.canEdit = this.context["data"].isEdit;
    this.client = this.context['data'].client;
    this.exercises$.next(this.context['data'].exercises)
    this.clientForm = new FormGroup({
      id: new FormControl(this.client.id),
      fullName: new FormControl(this.client.fullName, Validators.required),
      age: new FormControl(this.client.age, Validators.required),
      target: new FormControl(this.client.target, Validators.required),
      limits: new FormControl(this.client.limits),
      experience: new FormControl(this.client.experience),
      sleep: new FormControl(this.client.sleep),
      food: new FormControl(this.client.food),
      pharma: new FormControl(this.client.pharma),
      activity: new FormControl(this.client.activity),
    });

    this.limits_control = this.clientForm.get('limits') as FormControl;
  }

  public limits$ = this.search$
    .pipe(
      startWith(''),
      switchMap(search =>
        this.exercises$.pipe(
          map((items: any) => {
            const result = items
              .filter(({ name }: any) => TUI_DEFAULT_MATCHER(name, search))
              .map(({ id }: any) => id)
            return result;
          }),
        ),
      ),
      startWith(null)
    );

  stringify$: Observable<any> = this.exercises$.pipe(
    map(items => new Map(items.map(({ id, exercise_fullname }) => [id, exercise_fullname]))),
    startWith(new Map()),
    map(
      map => (id: TuiContext<number> | number) =>
        (tuiIsNumber(id) ? map.get(id) : map.get(id.$implicit)) || 'Loading...',
    )
  )

  onSearch(search: string | null): void {
    this.search$.next(search || '')
  }

  onSubmit() {
    if (!this.canEdit) {
      return this.clientConfigService.addClient(this.clientForm.value, this.context as TuiDialogContext<boolean, IClientDialog>);
    }
    return this.clientConfigService.editClient(this.clientForm.value, this.context as TuiDialogContext<boolean, IClientDialog>);
  }
}
