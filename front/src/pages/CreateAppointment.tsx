import React, { useState } from 'react';
import { createAppointment } from '../services/api';

const CreateAppointment: React.FC = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'PHYSICAL' | 'VIRTUAL'>('PHYSICAL');
  const [location, setLocation] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [hostId, setHostId] = useState<number>(0);
  const [clientId, setClientId] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createAppointment({
        title,
        type,
        location: type === 'PHYSICAL' ? location : undefined,
        startTime,
        endTime,
        hostId,
        clientId,
      });
      alert('Appointment created successfully');
    } catch (error) {
      alert('Failed to create appointment');
    }
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <select value={type} onChange={(e) => setType(e.target.value as 'PHYSICAL' | 'VIRTUAL')} required>
            <option value="PHYSICAL">Physical</option>
            <option value="VIRTUAL">Virtual</option>
          </select>
        </div>
        {type === 'PHYSICAL' && (
          <div>
            <label>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
        )}
        <div>
          <label>Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Host ID:</label>
          <input
            type="number"
            value={hostId}
            onChange={(e) => setHostId(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Client ID:</label>
          <input
            type="number"
            value={clientId}
            onChange={(e) => setClientId(parseInt(e.target.value))}
            required
          />
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateAppointment;