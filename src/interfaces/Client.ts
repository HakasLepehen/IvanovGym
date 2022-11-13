export interface IClient {
  id: string;
  fullName: string;
  avatar?: URL;
  age?: number;
  results?: Array<URL>;
  target?: string;
  limitations?: Array<string>;
  experience?: string;
  sleep?: string;
  food?: string;
  pharma?: string;
  activity?: string;
}