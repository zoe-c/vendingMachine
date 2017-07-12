var express = require('express');
var router = express.Router();

// route for the "admin" or in this case>>> vendor
router.get('/vendor', function(req, res, next) {
  res.send('If Please use /api/vendingMachine/:vendor to access your wonky-empty vending machine !');
});

module.exports = router;

// // add your validation reqs. try to base this off the basic auth via passport
// // baby steps
// router.get('/api/vendingMachine/:vendor')
// module.exports = router;
