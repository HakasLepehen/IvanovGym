import { User } from './user';
export class Admin extends User {
  override isAdmin = true;

  constructor(login: string, password: string) {
    super(login, password);
  }
}