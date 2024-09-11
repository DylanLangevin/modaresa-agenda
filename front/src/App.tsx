import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateAppointment from './pages/CreateAppointment';
import Agenda from './pages/Agenda';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Agenda />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
        </Routes>
    </Router>
  );
};

export default App;