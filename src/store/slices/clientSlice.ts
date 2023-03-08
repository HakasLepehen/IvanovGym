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
    addClients: (state: IUserState) => {
      state.clientsIsLoading = true;
    },
    addClientsSuccess: (state: IUserState, action: PayloadAction<IClient>) => {
      state.clients = [...state.clients, action.payload]
    },
    addClientsFailure: (state: IUserState) => {
      state.clientsIsLoading = false;
    },
  }
});

export const { reducer } = clientSlice;

export const {
  getClients,
  getClientsSuccess,
  getClientsFailure,
  addClients,
  addClientsSuccess,
  addClientsFailure
} = clientSlice.actions;

// export {reducer};