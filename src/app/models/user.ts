export class User {
  login: string;
  password: string;
  isAdmin = false;

  constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }
}