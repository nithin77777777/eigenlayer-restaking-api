const mongoose = require('mongoose');

const ValidatorSchema = new mongoose.Schema({
  operatorAddress: { type: String, required: true, unique: true },
  totalDelegatedStakeStETH: { type: String, required: true },
  slashHistory: [{
    timestamp: Number,
    amountStETH: String,
    reason: String
  }],
  status: { type: String, enum: ['active', 'jailed', 'slashed'], default: 'active' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Validator', ValidatorSchema);