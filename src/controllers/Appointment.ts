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

export default {
    index
}