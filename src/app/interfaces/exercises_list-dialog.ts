import { TuiDialog } from "@taiga-ui/core";

export default interface IExercisesListDialog extends TuiDialog<any> {
  clientGUID: string;
}