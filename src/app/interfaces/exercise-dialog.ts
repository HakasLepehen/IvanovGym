import { IExercise } from './exercise';
import { TuiDialogOptions } from '@taiga-ui/core';

export default interface IExerciseDialog extends TuiDialogOptions<any> {
  exercise: IExercise;
}
