const express = require('express');
const router = express.Router();
const { getRewardsByAddress, addReward } = require('../controllers/rewardController');

router.route('/:address')
  .get(getRewardsByAddress);

router.route('/')
  .post(addReward);

module.exports = router;