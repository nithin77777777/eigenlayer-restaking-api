const Validator = require('../models/Validator');

exports.getValidators = async (req, res) => {
  try {
    const validators = await Validator.find({});
    res.json(validators);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.addValidator = async (req, res) => {
  const { operatorAddress, totalDelegatedStakeStETH, slashHistory, status } = req.body;

  try {
    let validator = await Validator.findOne({ operatorAddress });

    if (validator) {
      // Update existing validator
      validator.totalDelegatedStakeStETH = totalDelegatedStakeStETH;
      validator.slashHistory = slashHistory || [];
      validator.status = status || 'active';
      validator.lastUpdated = Date.now();
      await validator.save();
      return res.json(validator);
    }

    // Create new validator
    validator = new Validator({
      operatorAddress,
      totalDelegatedStakeStETH,
      slashHistory: slashHistory || [],
      status: status || 'active'
    });

    await validator.save();
    res.json(validator);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};