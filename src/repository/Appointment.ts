import { PrismaClient, Appointment as PrismaAppointment } from '@prisma/client';

const prisma = new PrismaClient();

const index = async(): Promise<PrismaAppointment[]> => {

    try {
        return await prisma.appointment.findMany({
          where: { deletedAt: null }
      });
    }
    catch(error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
}

const create = async (
    title: string,
    type: 'VIRTUAL' | 'PHYSICAL',
    location: string | null | undefined,
    hostId: number,
    clientId: number,
    startTime: Date,
    endTime: Date
  ): Promise<PrismaAppointment> => {
    try {
      
      return await prisma.appointment.create({
        data: {
          title,
          type,
          location,
          host:{ connect: { id: hostId } },
          client:{ connect: { id: clientId }},
          startTime,
          endTime
        },
      })
    } catch (error) {

      console.error('Error creating appointment:', error);
      throw error;
    }
};

const update = async (
    id: number,
    title: string,
    type: 'VIRTUAL' | 'PHYSICAL',
    location: string | null,
    hostId: number,
    clientId: number,
    startTime: Date,
    endTime: Date
  ): Promise<PrismaAppointment> => {
    try {

      return await prisma.appointment.update({
        where: {
          id: id
        },
        data: {
          title,
          type,
          location,
          host:{ connect: { id: hostId } },
          client:{ connect: { id: clientId }},
          startTime,
          endTime
        }
      })

    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
};

const deleteAppointment = async (id: number): Promise<boolean> => {
  try {

      const updatedAppointment = await prisma.appointment.update({
          where: { id: id },
          data: { deletedAt: new Date() }
      });

      return !!updatedAppointment;
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