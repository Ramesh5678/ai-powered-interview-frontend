const express = require('express');
const router = express.Router();
const candidateModel = require('../models/candidateModel');

router.get('/', async (req, res, next) => {
  try {
    const candidates = await candidateModel.getAllCandidates();
    res.status(200).json(candidates);
  } catch (err) {
    next(err);
  }
});

module.exports = router;