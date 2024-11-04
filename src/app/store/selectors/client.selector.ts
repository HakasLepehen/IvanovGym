import { createSelector, State } from "@ngrx/store";
import { IClientState } from "../state/client.state";

const selectClients = (state: any) => state.clientsState;

export const clientsSelector = createSelector(selectClients,
  (state: IClientState) => state.clients
);