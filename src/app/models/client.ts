export class Client {
  private id!: number;
  private created_at: Date;
  fullName: string;
  private age: number = 0;
  private target: string;
  private limits: string;
  private experience: string;
  private sleep: string;
  private food: string;
  private pharma: string;
  private activity: string;
  private avatar: string;

  constructor(
    fullName: string,
    id?: number,
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
    if (id) {
      this.id = id;
    }
    this.fullName = fullName;
    this.created_at = created_at || new Date();
    this.age = age || 0;
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
