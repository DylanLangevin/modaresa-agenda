import React, { useEffect, useState } from 'react';
import { getAppointments, createAppointment, cancelAppoitment } from '../services/api';

interface Vendor {
  id: number;
  name: string;
}

interface Buyer {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  title: string;
  type: 'VIRTUAL' | 'PHYSICAL';
  location?: string | null;
  host: Vendor;
  client: Buyer;
  startTime: Date;
  endTime: Date;
}

const Agenda: React.FC = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'VIRTUAL' | 'PHYSICAL'>('PHYSICAL');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const createAppointmentAction = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const hostId = 1;
    const clientId = 2;

    try {
      
      await createAppointment({
        title,
        type,
        location: type === 'PHYSICAL' ? location : undefined,
        startTime ,
        endTime,
        hostId,
        clientId,
      });

      alert('Appointment created successfully');
    } catch (error) {
      alert('Failed to create appointment');
      console.error('Error:', error);
    }
  };

  const cancelAppointmentAction = async (id: number) => {
    try {
      await cancelAppoitment(id);

      const response = await getAppointments(); 
      setAppointments(response.data);
    } catch (error) {
      alert('Failed to cancel appointment');
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointments();
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <h2 className="mb-4">Rendez-vous</h2>
          {appointments.length > 0 ? (
            <div className="list-group mb-1 ">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="bg-light p-3 mb-3  rounded">
                  <h4>{appointment.title}</h4>
                  <p>{appointment.type}</p>
                  {appointment.location && (
                    <p><strong>Lieu:</strong> {appointment.location}</p>
                  )}
                  <p>
                    <strong>Début:</strong> {new Date(appointment.startTime).toLocaleString()}
                    <br />
                    <strong>Fin:</strong> {new Date(appointment.endTime).toLocaleString()}
                  </p>
                  <button onClick={() => cancelAppointmentAction(appointment.id)}  className='btn btn-outline-primary'>Annuler ce rendez-vous</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Vous n'avez pas encore de rendez-vous !</p>
          )}
        </div>

        <div className="col-md-6">
          <h2 className="mb-4">Créer un Rendez-vous</h2>
          <form className='rounded p-3 bg-light'>
            <div className="mb-3">
              <label className="form-label">Titre:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Type:</label>
              <select
                className="form-select"
                value={type}
                onChange={(e) => setType(e.target.value as 'VIRTUAL' | 'PHYSICAL')}
                required
              >
                <option value="PHYSICAL">Physique</option>
                <option value="VIRTUAL">Virtuel</option>
              </select>
            </div>

            {type === 'PHYSICAL' && (
              <div className="mb-3">
                <label className="form-label">Lieu:</label>
                <input
                  type="text"
                  className="form-control"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Début:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fin:</label>
              <input
                type="datetime-local"
                className="form-control"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            <button onClick={() => createAppointmentAction} type="submit" className="btn btn-primary">Créer Rendez-vous</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Agenda;
