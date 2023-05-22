import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthState, IGlobalState } from '../../interfaces/interfaces';

export const tokenSelector = createFeatureSelector('auth');

// export const selectToken = (state: IAuthState) => state.token;
export const selectToken = createSelector(
  tokenSelector,
  (state: any) => state.token
);
