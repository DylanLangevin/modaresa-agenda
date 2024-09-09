import express from 'express';
import ApppointmentController from './controllers/Appointment'
const app = express();
const port = 3000;

app.use(express.json());

// Get all appointments
app.get('/appointments', ApppointmentController.index)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


