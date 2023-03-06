import { IClient } from '../../interfaces/Client';
import { getClientsRequest } from '../../requests/ClientRequests';
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
    getClients(state) {
      state.clientsIsLoading = true;
    },
    getClientsSuccess: (state, action) => {
      state.clients = action.payload
    },
    getClientsFailure: (state: IUserState) => {
      state.clientsIsLoading = false;
    }
  }
});

export const { reducer } = clientSlice;

export const { getClients, getClientsSuccess, getClientsFailure } = clientSlice.actions;

// export {reducer};