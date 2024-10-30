import { TuiDialogOptions } from '@taiga-ui/core';

export interface ITrainingDialog extends TuiDialogOptions<any> {
  training: any;
  isPlanning: boolean;
}