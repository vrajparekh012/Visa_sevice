const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController');

// GET all countries (with filtering)
router.get('/', countryController.getAllCountries);

// GET single country details
router.get('/:id', countryController.getCountryDetails);

module.exports = router;