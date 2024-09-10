import { Appointment } from "../models/Appointment"
import { Vendor } from "../models/Vendor"
import { Buyer } from "../models/Buyer"

import { PrismaClient, Appointment as PrismaAppointment } from '@prisma/client';

const prisma = new PrismaClient();

let appointments: Appointment[] = [];

const index = async(): Promise<PrismaAppointment[]> => {

    try {
        return await prisma.appointment.findMany();
    }
    catch(error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

const create = async (
    title: string,
    type: 'physical' | 'physical',
    location: string | null | undefined,
    host: Vendor,
    client: Buyer,
    startTime: Date,
    endTime: Date
  ): Promise<Appointment> => {
    try {

      const newAppointment: Appointment = {
        id: appointments.length + 1, 
        title,
        type,
        location, 
        host,
        client,
        startTime,
        endTime,
      };
  
      appointments.push(newAppointment);
  
      return newAppointment;

    } catch (error) {

      console.error('Error creating appointment:', error);
      throw error;
    }
};

const update = async (
    id: number,
    title: string,
    type: 'virtual' | 'physical',
    location: string | null,
    host: Vendor,
    client: Buyer,
    startTime: Date,
    endTime: Date
  ): Promise<Appointment | null> => {
    try {
      const appointmentIndex = appointments.findIndex((appt) => appt.id === id);
  
      if (appointmentIndex === -1) {
        return null;
      }

      appointments[appointmentIndex] = {
        id,
        title,
        type,
        location: type === 'physical' ? location : null,
        host,
        client,
        startTime,
        endTime,
      };
  
      return appointments[appointmentIndex];
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
};

const deleteAppointment = async (id: number): Promise<boolean> => {
    try {
      const appointmentIndex = appointments.findIndex((appt) => appt.id === id);
  
      if (appointmentIndex === -1) {
        return false;
      }
  
      appointments.splice(appointmentIndex, 1);
      return true;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
};

export default {
    index,
    create,
    update,
    delete: deleteAppointment,
}