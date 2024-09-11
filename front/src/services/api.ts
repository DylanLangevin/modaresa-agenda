import axios from 'axios';

const api = axios.create({
    //TODO METTRE DANS .env
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export const getAppointments = async () => {

  try {

    const response = await api.get('/appointments');
    return response.data;

  } catch (error) {

    console.error('Error fetching appointments:', error);

    
    throw error;
  }
};

export const createAppointment = async (appointmentData: {
  title: string;
  type: 'PHYSICAL' | 'VIRTUAL';
  location?: string;
  startTime: string;
  endTime: string;
  hostId: number;
  clientId: number;
}) => {
  try {

    const response = await api.post('/appointments', appointmentData);
    return response.data;

  } catch (error) {

    console.error('Error creating appointment:', error);


    throw error;
  }
};

export const cancelAppoitment = async (id:number) => {
  try {

    const response = await api.delete('/appointments/'+id);
    return response.data;

  } catch (error) {

    console.error('Error creating appointment:', error);


    throw error;
  }
};