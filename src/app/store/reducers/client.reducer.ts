import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "../state/client.state";
import * as UserActions from '../actions/client.action';

export const clientReducer = createReducer(
  initialUserState,
  on(UserActions.setClients, (state, { clients }) => ({...state, clients: clients}))
)