import express from 'express';
import ApppointmentController from './controllers/Appointment'
const app = express();
const port = 3000;

app.use(express.json());

// Appointments

// Get all appointments
app.get('/appointments', ApppointmentController.index)

// Create an appointment
app.post('/appointments', ApppointmentController.create);

// Update an appointment by ID
app.put('/appointments/:id', ApppointmentController.update);

// Delete an appointment by ID
app.delete('/appointments/:id', ApppointmentController.deleteAppointment);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


