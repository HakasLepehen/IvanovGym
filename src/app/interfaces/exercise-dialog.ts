import { EventEmitter } from '@angular/core';
import { IExercise } from './exercise';
import { TuiDialogOptions } from '@taiga-ui/core';

export default interface IExerciseDialog extends TuiDialogOptions<any> {
  model: IExercise;
  isEdit: boolean;
  event: EventEmitter<void>;
}
