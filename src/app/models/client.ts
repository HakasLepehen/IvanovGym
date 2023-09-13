import * as uuid from 'uuid';

export class Client {
  fullName: string;
  guid?: string;
  created_at?: Date;
  age?: number = 0;
  target?: string;
  limits?: string;
  experience?: string;
  sleep?: string;
  food?: string;
  pharma?: string;
  activity?: string;
  avatar?: string;

  constructor(
    fullName: string,
    created_at?: Date,
    age?: number,
    target?: string,
    limits?: string,
    experience?: string,
    sleep?: string,
    food?: string,
    pharma?: string,
    activity?: string,
    avatar?: string
  ) {
    this.fullName = fullName;
    this.created_at = created_at || new Date();
    this.age = age;
    this.target = target || '';
    this.limits = limits || '';
    this.experience = experience || '';
    this.sleep = sleep || '';
    this.food = food || '';
    this.pharma = pharma || '';
    this.activity = activity || '';
    this.avatar = avatar || '';
  }
}
