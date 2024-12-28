import { TuiDialogOptions } from '@taiga-ui/core';
import { TuiDay } from "@taiga-ui/cdk";

export interface ITrainingDialog extends TuiDialogOptions<any> {
  training: any;
  isPlanning: boolean;
  selectedDay: TuiDay;
}