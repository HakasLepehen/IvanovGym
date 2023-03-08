import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IClient } from '../../interfaces/Client';

export interface IUserState {
  clients: IClient[];
  clientsIsLoading: boolean;
}

const initialState = {
  clients: [],
  clientsIsLoading: false
} as IUserState

const clientSlice = createSlice({
  name: 'clientSlice',
  initialState,
  reducers: {
    getClients: (state: IUserState) => {
      state.clientsIsLoading = true;
    },
    getClientsSuccess: (state: IUserState, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload
      state.clientsIsLoading = false;
    },
    getClientsFailure: (state: IUserState) => {
      state.clientsIsLoading = false;
    },
    addClient: (state: IUserState) => {
      state.clientsIsLoading = true;
    },
  }
});

export const { reducer } = clientSlice;

export const {
  getClients,
  getClientsSuccess,
  getClientsFailure,
  addClient,
} = clientSlice.actions;

// export {reducer};