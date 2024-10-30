import IAuthState from './auth-state';
import IClientsState from './clients-state';

export default interface IGlobalState {
  auth: IAuthState;
  clients: IClientsState
}
