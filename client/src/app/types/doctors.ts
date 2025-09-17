export interface Doctors {
  _id: string;
  userId: string; 
  description: string;
  specialization: string;
  licensNum?: number;
  availableDay: string[];
  name?: string;
  avatar?: string;
}
