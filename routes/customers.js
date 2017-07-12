var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Please use /api/vendingMachine to access this wonky, empty vending machine!');
});

module.exports = router;
