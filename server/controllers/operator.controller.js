const operatorModel = require('../models/operator.model');

exports.registerOperator = (req, res) => {
  const { name, phone, business } = req.body;
  if (!name || !phone || !business) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const operator = operatorModel.addOperator({ name, phone, business });
  res.status(201).json({ message: 'Operator registered successfully!', operator });
};

exports.getOperators = (req, res) => {
  const operators = operatorModel.getAllOperators();
  res.json(operators);
};
