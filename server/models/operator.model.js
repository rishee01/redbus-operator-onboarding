const operators = [];

module.exports = {
  addOperator: (operator) => {
    operators.push(operator);
    return operator;
  },
  getAllOperators: () => operators,
};
