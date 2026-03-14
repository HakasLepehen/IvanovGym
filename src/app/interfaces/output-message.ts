import { MessageTypes } from "../enums/message-types"

export type OutputMessage = {
  id: number | string;
  type: MessageTypes;
  index: number;
}