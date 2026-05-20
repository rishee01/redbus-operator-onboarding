const express = require('express');
const router = express.Router();
const operatorController = require('./controllers/operator.controller');

router.post('/register', operatorController.registerOperator);
router.get('/', operatorController.getOperators);

module.exports = router;
