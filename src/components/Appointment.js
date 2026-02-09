import React, { useState } from 'react';
import './Appointment.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Appointment() {
  const [appointment, setAppointment] = useState({
    place: '',
    date: '',
    service: 'fertilize',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointment({ ...appointment, [name]: value });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/appointments', appointment);
      console.log('Appointment booked:', response.data);
      toast.success('Appointment booked successfully!');
    } catch (err) {
      console.error('Error booking appointment:', err);
      toast.error('Error booking appointment. Please try again.');
    }
  };

  return (
    <div className="appointment-container">
      <h1>Appointment</h1>
      <form onSubmit={bookAppointment}>
        <div>
          <label>Place:</label>
          <input
            type="text"
            name="place"
            value={appointment.place}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={appointment.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Service:</label>
          <select
            name="service"
            value={appointment.service}
            onChange={handleInputChange}
          >
            <option value="fertilize">Fertilize</option>
            <option value="medicine">Medicine</option>
            <option value="recover">Recover</option>
          </select>
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}

export default Appointment;
