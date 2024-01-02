export class BodyPart {
  private _id: number;
  private _part_name: string;
  constructor(id: number, part_name: string) {
    this._id = id;
    this._part_name = part_name;
  }

  get part_name(): string {
    return this._part_name;
  }

  get id(): number {
    return this._id;
  }
}