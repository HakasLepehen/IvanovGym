import { TuiDialog } from "@taiga-ui/core";
import { IExercise } from "./exercise";

export default interface IExercisesListDialog extends TuiDialog<any> {
  clientGUID: string;
  exercise: IExercise;
  index: number;
}