import { TuiDialogOptions } from '@taiga-ui/core';
import { IClient } from './client';
import IClientExercise from './client_exercise';

export default interface IClientDialog extends TuiDialogOptions<any> {
  client: IClient;
  isEdit: boolean;
  exercises: IClientExercise[];
}
