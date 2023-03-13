import { IClient } from './../../interfaces/Client';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

    getClients: (state: IUserState) => { state.clientsIsLoading = true; },

    getClientsSuccess: (state: IUserState, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload
      state.clientsIsLoading = false;
    },

    getClientsFailure: (state: IUserState) => { state.clientsIsLoading = false; },

    addClient: (state: IUserState) => { state.clientsIsLoading = true; },

    deleteClient: (state: IUserState, action: PayloadAction<number>) => { state.clientsIsLoading = true; },

    deleteClientSuccess: (state: IUserState, action: PayloadAction<number>) => {
      state.clientsIsLoading = false;
      state.clients = state.clients.filter(el => {
        return el.id != action.payload
      });
    },

    deleteClientFailure: (state: IUserState) => { state.clientsIsLoading = true; },

    updateClient: (state: IUserState, action: PayloadAction<IClient>) => { state.clientsIsLoading = true; },

    updateClientSuccess: (state: IUserState) => {
      state.clientsIsLoading = false;
    },

    updateClientFailure: (state: IUserState) => { state.clientsIsLoading = false; }
  }
});

export const { reducer } = clientSlice;

export const {
  getClients,
  getClientsSuccess,
  getClientsFailure,
  addClient,
  deleteClient,
  deleteClientSuccess,
  deleteClientFailure,
  updateClient,
  updateClientSuccess,
  updateClientFailure
} = clientSlice.actions;

// export {reducer};