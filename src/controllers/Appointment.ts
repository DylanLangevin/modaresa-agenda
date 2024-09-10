import { Request, Response } from 'express';

import AppointmentRepository from '../repository/Appointment';

const index = async(_: Request, res: Response): Promise<void> => {
    try {

        const appointments = await AppointmentRepository.index();

        res.status(200).json({
            status: 'success',
            data: appointments
        });
    }
    catch(error) {
      
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
          } else {
            res.status(400).json({ error: 'An unknown error occurred' });
          }
    }
}

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, type, location, host, client, startTime, endTime } = req.body;

        const newAppointment = await AppointmentRepository.create(
            title,
            type,
            location,
            host,
            client,
            startTime,
            endTime,
        );

        res.status(201).json({
            status: 'success',
            data: newAppointment,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { title, type, location, host, client, startTime, endTime } = req.body;

        const updatedAppointment = await AppointmentRepository.update(
            parseInt(id), 
            title,
            type,
            location,
            host,
            client,
            startTime,
            endTime,
        );

        res.status(200).json({
            status: 'success',
            data: updatedAppointment,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

const deleteAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

export default {
    index,
    create,
    update,
    deleteAppointment
}