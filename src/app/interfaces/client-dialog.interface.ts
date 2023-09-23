import { TuiDialogOptions } from '@taiga-ui/core';
import { Client } from '../models/client';

export default interface IClientDialog extends TuiDialogOptions<any>{
  client: Client,
  isEdit: boolean
}
