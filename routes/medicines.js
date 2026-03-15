const express = require('express');
const Medicine = require('../models/Medicine');
const auth = require('../Middleware/authMiddleware'); 

const router = express.Router();

router.post('/', auth, async (req, res) => {
    console.log(req.body);
  const { name, category, expDate, quantity, price } = req.body;

  try {
    const medicine = new Medicine({
      name,
      category,
      expDate,
      quantity,
      price,
      user: req.user._id
    });

    await medicine.save();
    res.status(201).json(medicine);

  } catch (err) {
  res.status(400).json({ error: 'Failed to add medicine' });
}
});

router.get('/', auth, async (req, res) => {
  try {
    const medicines = await Medicine
      .find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine)
      return res.status(404).json({ error: 'Medicine not found' });

    if (medicine.user.toString() !== req.user._id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    await medicine.deleteOne();

    res.json({ message: 'Medicine deleted' });

  } catch (err) {
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
});

module.exports = router;
