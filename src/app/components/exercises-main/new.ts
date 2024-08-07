// <tui-expand [expanded]="expandedBlock">
// <ng-template tuiExpandContent>
//   <form *ngIf="expandedBlock" [formGroup]="exForm" (ngSubmit)="onSubmit()">
//     <!-- Наименование упражнения -->
//     <div class="tui-form__row">
//       <tui-input formControlName="exercise_name" tuiTextfieldSize="m">
//         Наименование упражнения
//         <input tuiTextfield />
//         <span class="tui-required"></span>
//       </tui-input>
//       <tui-error formControlName="exercise_name" [error]="[] | tuiFieldError | async"></tui-error>
//     </div>

//     <div class="tui-form__row">
//       <tui-select formControlName="muscle_group" tuiTextfieldSize="m" [tuiTextfieldLabelOutside]="true"
//         [valueContent]="stringify(body_parts)">
//         Выберите группу мышц
//         <ng-template tuiDataList>
//           <tui-data-list *ngIf="body_parts;">
//             <button *ngFor="let item of body_parts" tuiOption [value]="item.id">
//               {{ item.name }}
//             </button>
//           </tui-data-list>
//         </ng-template>
//       </tui-select>
//     </div>
//     <div formArrayName="exec_var">
//       <h4>Варианты выполнения</h4>
//       <div class="tui-form__row" *ngFor="let item of exec_var.controls; let i = index">
//         <div formGroupName="{{i}}">

//           <!-- НАИМЕНОВАНИЕ ВЫПОЛНЕНИЯ -->
//           <tui-input tuiTextfieldSize="m" formControlName="name" id="name-{{i}}">
//             Название
//             <input tuiTextfield />
//             <span class="tui-required"></span>
//           </tui-input>
//           <tui-error formControlName="name" [error]="[] | tuiFieldError | async"></tui-error>
//           <!-- ССЫЛКА НА ВИДЕОЗАПИСЬ -->
//           <tui-input tuiTextfieldSize="m" formControlName="url" id="url-{{i}}">
//             Ссылка на видео
//             <input tuiTextfield />
//             <span class="tui-required"></span>
//           </tui-input>
//           <tui-error formControlName="url" [error]="[] | tuiFieldError | async"></tui-error>
//           <!-- КОММЕНТАРИЙ -->
//           <tui-input tuiTextfieldSize="m" formControlName="comment" id="comment-{{i}}">
//             Комментарий
//             <input tuiTextfield />
//             <span class="tui-required"></span>
//           </tui-input>
//           <tui-error formControlName="comment" [error]="[] | tuiFieldError | async"></tui-error>

//         </div>
//       </div>
//     </div>
//   </form>
//   <button tuiButton [size]="'m'" (click)="click($event)" type="button">Добавить вариант</button>
// </ng-template>
// </tui-expand>
// <button *ngIf="expandedBlock" tuiButton [size]="'m'" (click)="onSubmit()" type="submit">Сохранить</button>