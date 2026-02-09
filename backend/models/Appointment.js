const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  place: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  service: {
    type: String,
    required: true,
    
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;