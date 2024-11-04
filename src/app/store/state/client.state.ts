import { IClient } from 'src/app/interfaces/client';

export interface IClientState {
  clients: IClient[];
}

export const initialUserState: IClientState = {
  clients: [],
}