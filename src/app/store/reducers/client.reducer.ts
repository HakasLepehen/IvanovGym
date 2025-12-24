import { createReducer, on } from '@ngrx/store';
import { IClientState, initialUserState } from '../state/client.state';
import * as UserActions from '../actions/client.action';

export const clientReducer = createReducer(
  initialUserState,
  on(UserActions.setClients, (state, { clients }) => ({ ...state, clients: clients })),
  on(UserActions.updateClient, (state: IClientState, { client }) => {
    const updatedClient = client;
    let newClients = state.clients.map((clientFromState) => (clientFromState.id != updatedClient.id ? clientFromState : updatedClient));
    return { ...state, clients: newClients };
  })
);
