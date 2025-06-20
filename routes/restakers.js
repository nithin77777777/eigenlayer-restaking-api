const express = require('express');
const router = express.Router();
const { getRestakers, addRestaker } = require('../controllers/restakerController');

router.route('/')
  .get(getRestakers)
  .post(addRestaker);

module.exports = router;