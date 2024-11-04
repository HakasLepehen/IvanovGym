import { IClient } from 'src/app/interfaces/client';
import { createAction, props } from "@ngrx/store";

export const setClients = createAction('[Main Component] Set Clients', props<{ clients: IClient[] }>());