const Restaker = require('../models/Restaker');

exports.getRestakers = async (req, res) => {
  try {
    const restakers = await Restaker.find({});
    res.json(restakers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addRestaker = async (req, res) => {
  const { userAddress, amountRestakedStETH, targetAVSOperatorAddress } = req.body;

  try {
    let restaker = await Restaker.findOne({ userAddress });

    if (restaker) {
      // Update existing restaker
      restaker.amountRestakedStETH = amountRestakedStETH;
      restaker.targetAVSOperatorAddress = targetAVSOperatorAddress;
      restaker.lastUpdated = Date.now();
      await restaker.save();
      return res.json(restaker);
    }

    // Create new restaker
    restaker = new Restaker({
      userAddress,
      amountRestakedStETH,
      targetAVSOperatorAddress
    });

    await restaker.save();
    res.json(restaker);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};