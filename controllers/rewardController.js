const Reward = require('../models/Reward');

exports.getRewardsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    const rewards = await Reward.findOne({ walletAddress: address });

    if (!rewards) {
      return res.status(404).json({ msg: 'No rewards found for this address' });
    }
    res.json(rewards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addReward = async (req, res) => {
  const { walletAddress, totalRewardsReceivedStETH, rewardsBreakdown } = req.body;

  try {
    let reward = await Reward.findOne({ walletAddress });

    if (reward) {
      // Update existing reward
      reward.totalRewardsReceivedStETH = totalRewardsReceivedStETH;
      reward.rewardsBreakdown = rewardsBreakdown || [];
      reward.lastUpdated = Date.now();
      await reward.save();
      return res.json(reward);
    }

    // Create new reward
    reward = new Reward({
      walletAddress,
      totalRewardsReceivedStETH,
      rewardsBreakdown: rewardsBreakdown || []
    });

    await reward.save();
    res.json(reward);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};