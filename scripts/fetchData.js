require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');

// Import models using absolute paths
const Restaker = require(path.join(__dirname, '../models/Restaker'));
const Validator = require(path.join(__dirname, '../models/Validator'));
const Reward = require(path.join(__dirname, '../models/Reward'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for data fetching'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mock data fallback
const MOCK_DATA = {
  restakers: [
    {
      userAddress: "0x1111111111111111111111111111111111111111",
      amountRestakedStETH: "100.5",
      targetAVSOperatorAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  validators: [
    {
      operatorAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      totalDelegatedStakeStETH: "5000",
      slashHistory: [{
        timestamp: 1678886400,
        amountStETH: "50",
        reason: "Downtime"
      }],
      status: "active"
    }
  ],
  rewards: [
    {
      walletAddress: "0x1111111111111111111111111111111111111111",
      totalRewardsReceivedStETH: "75.2",
      rewardsBreakdown: [{
        operatorAddress: "0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        amountStETH: "60.0",
        timestamps: [1678972800, 1679059200]
      }]
    }
  ]
};

async function fetchFromSubgraph() {
  try {
    const query = `{ delegations { id delegator amount operator } }`;
    const res = await axios.post(process.env.EIGENLAYER_SUBGRAPH_URL, { query });
    return res.data?.data || null;
  } catch (err) {
    console.error('Subgraph error:', err.message);
    return null;
  }
}

async function updateDatabase() {
  try {
    const data = await fetchFromSubgraph() || MOCK_DATA;

    // Clear and insert data
    await Restaker.deleteMany();
    await Restaker.insertMany(data.restakers);

    await Validator.deleteMany();
    await Validator.insertMany(data.validators);

    await Reward.deleteMany();
    await Reward.insertMany(data.rewards);

    console.log('Data updated successfully!');
  } catch (err) {
    console.error('Database update failed:', err);
  } finally {
    mongoose.disconnect();
  }
}

updateDatabase();