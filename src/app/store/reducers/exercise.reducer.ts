import { createReducer, on } from "@ngrx/store"
import { reload } from "../actions/exercise.actions"

export const initialState = {}

export const exerciseReducer = createReducer(
  initialState,
  on(reload, (state): any => { return { ...state } })
)