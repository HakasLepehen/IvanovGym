type IUserState = {
  isAdmin: boolean;
}

const initialUserState: IUserState = {
  isAdmin: false,
}

export const UserStore = signalStore
