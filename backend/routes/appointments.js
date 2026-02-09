const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

router.post('/', async (req, res) => {
  console.log('Received request to create appointment:', req.body);
  const { place, date, service } = req.body;

  try {
    const newAppointment = new Appointment({ place, date, service });
    await newAppointment.save();
    console.log('Appointment created:', newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;