import { createAction, props } from '@ngrx/store';
import { ActionTypes } from './actionTypesEnums';

export const setToken = createAction(ActionTypes.SET_TOKEN, props<{ token: string }>());