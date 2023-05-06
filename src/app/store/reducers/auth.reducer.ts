import { createReducer, on } from '@ngrx/store';
import { initialState } from '../store';
import { setToken } from '../actions/auth.action';
import { state } from '@angular/animations';

export const authReducer = createReducer(
  initialState,
  on(setToken, (state, { token }) => {
    return {
      ...state,
      token: token
    }
  })
)