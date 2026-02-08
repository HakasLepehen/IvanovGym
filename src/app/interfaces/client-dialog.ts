import { TuiDialogOptions } from '@taiga-ui/core';
import { IClient } from './client';
import { IExercise } from './exercise';

export default interface IClientDialog extends TuiDialogOptions<any> {
  client: IClient;
  isEdit: boolean;
  exercises: IExercise[];
}
