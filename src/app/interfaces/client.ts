import * as uuid from 'uuid';

export interface IClient {
  fullName: string;
  guid?: string;
  created_at?: Date;
  age?: number;
  target?: string;
  limits?: string;
  experience?: string;
  sleep?: string;
  food?: string;
  pharma?: string;
  activity?: string;
  avatar?: string;
  id?: number | null;
}
