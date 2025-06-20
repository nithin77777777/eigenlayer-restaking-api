const mongoose = require('mongoose');

const RewardSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  totalRewardsReceivedStETH: { type: String, required: true },
  rewardsBreakdown: [{
    operatorAddress: String,
    amountStETH: String,
    timestamps: [Number]
  }],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reward', RewardSchema);