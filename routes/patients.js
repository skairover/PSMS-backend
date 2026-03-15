const express = require('express');
const Patient = require('../models/Patient');
const auth = require('../Middleware/authMiddleware'); 

const router = express.Router();

router.post('/', auth, async (req, res) => {
    console.log(req.body);
  const { name, age, condition, doctor, arrival, priority } = req.body;

  try {
    const patient = new Patient({
      name,
      age,
      condition,
      doctor,
      arrival,
      priority,
      user: req.user._id
    });

    await patient.save();
    res.status(201).json(patient);

  } catch (err) {
  res.status(400).json({ error: 'Failed to add patient' });
}
});

router.get('/', auth, async (req, res) => {
  try {
    const patients = await Patient
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient)
      return res.status(404).json({ error: 'Patient not found' });

    if (patient.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    await patient.deleteOne();

    res.json({ message: 'Patient deleted' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});

module.exports = router;
