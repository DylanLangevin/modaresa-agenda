import {Vendor} from './Vendor'
import {Buyer} from './Buyer'

export interface Appointment {
    id: number;
    title: string;
    type: string;
    location?: string;
    host: Vendor;
    client: Buyer;
    startTime: Date;
    endTime: Date;
  }