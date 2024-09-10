import {Vendor} from './Vendor'
import {Buyer} from './Buyer'

export interface Appointment {
  id: number;
  title: string;
  type: 'virtual' | 'physical';
  location?: string | null;
  host: Vendor;
  client: Buyer;
  startTime: Date;
  endTime: Date;
}