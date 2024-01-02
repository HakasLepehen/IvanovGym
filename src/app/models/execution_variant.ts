export class ExecutionVariant {
  private _name: string;
  private _url?: string;
  private _comment?: string;

  constructor(name: string, url?: string, comment?: string) {
    this._name = name;
    this._url = url;
    this._comment = comment;
  }
}
