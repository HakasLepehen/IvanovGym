import { createFeatureSelector, createSelector } from '@ngrx/store';
import IAuthState from '../../interfaces/auth-state';

import IGlobalState from '../../interfaces/global-state.interface';

export const tokenSelector = createFeatureSelector('auth');

// export const selectToken = (state: IAuthState) => state.token;
export const selectToken = createSelector(tokenSelector, (state: any) => state.token);
