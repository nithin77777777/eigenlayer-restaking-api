const express = require('express');
const router = express.Router();
const { getValidators, addValidator } = require('../controllers/validatorController');

router.route('/')
  .get(getValidators)
  .post(addValidator);

module.exports = router;