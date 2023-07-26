import { ActionCreator, createAction } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const increment: ActionCreator<'[Counter Component] Increment', () => TypedAction<'[Counter Component] Increment'>> = createAction('[Counter Component] Increment');
export const decrement: ActionCreator<'[Counter Component] Decrement', () => TypedAction<'[Counter Component] Decrement'>> = createAction('[Counter Component] Decrement');
export const reset: ActionCreator<'[Counter Component] Reset', () => TypedAction<'[Counter Component] Reset'>> = createAction('[Counter Component] Reset');