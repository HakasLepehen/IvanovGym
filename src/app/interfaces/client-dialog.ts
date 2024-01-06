import { TuiDialogOptions } from '@taiga-ui/core';
import { IClient } from './client';

export default interface IClientDialog extends TuiDialogOptions<any> {
  client: IClient;
  isEdit: boolean;
}
