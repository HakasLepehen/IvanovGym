import { ExecutionVariant } from './execution_variant';
export class Exercise {
  private _exercise_name: string;
  private _exec_var: Array<ExecutionVariant>;
  private _muscle_groups_id?: number;

  constructor(exercise_name: string, exec_var: Array<ExecutionVariant>, muscle_groups_id?: number) {
    this._exercise_name = exercise_name;
    this._exec_var = exec_var;
    this._muscle_groups_id = muscle_groups_id;
  }

  get exercise_name(): string {
    return this._exercise_name;
  }

  get exec_var(): Array<ExecutionVariant> {
    return this._exec_var;
  }

  get muscle_groups_id(): number | undefined {
    return this._muscle_groups_id;
  }

  set exercise_name(val: string) {
    this._exercise_name = val;
  }

  set exec_var(val: Array<ExecutionVariant>) {
    this._exec_var = val;
  }

  set muscle_groups_id(val: number | undefined) {
    this._muscle_groups_id = val;
  }
}
