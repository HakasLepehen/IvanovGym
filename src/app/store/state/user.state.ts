import { signalStore, withState } from '@ngrx/signals';

type IUserState = {
  isAdmin: boolean;
}

const initialUserState: IUserState = {
  isAdmin: false,
}

export const UserStore = signalStore(
  withState<IUserState>(initialUserState),
)
