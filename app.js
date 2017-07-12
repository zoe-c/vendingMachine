// app reqs
const express = require('express');

// mongoose and connection
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Customer = require('./models/customer.js');
const Item = require('./models/item.js');
const Vendor = require('./models/vendor.js');
const customerRouter = require('./routes/customers');
const venderRouter = require('./routes/vendors');

const path = require('path');
const bodyParser = require('body-parser');

// const mustache = require('mustache-express');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/vendingMachine');
// console.log('CONNECTED ON THA PORT');
var db = mongoose.connection;
console.log(db);





// app set up
const app = express();


// // view engine setup
// app.engine('mustache', mustache());
// app.set('view engine', 'mustache');
// app.set('views','./views');

// bodyparser-middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/users', require('./routes/customers'));
app.use('/vendors', require('./routes/vendors'));



passport.use(new BasicStrategy(
  function(username, password, done) {
    Vendor.findOne({ name: username }, function(err, vendor){
      console.log("FOUND A MATCH: " + vendor)
      if (vendor && bcrypt.compareSync(password, vendor.password)){
        return done(null, vendor);
      }
      return done(null, false);
    });
  }
));

app.get('/api/auth',
  passport.authenticate('basic', {session: false}), function (req, res) {
     console.log(req.vendor)
      res.send('You have been authenticated, ' + req.vendor.name);
  }
);




// CREATE ITEM INSTANCES TO GET SOME ITEMS IN THE VENDING MACHINE


// VENDOR INSTANCE JUST TO RUN AUTH CODE PROVIDED IN DEMO ((passport basic auth)) ***do not delete
// var newVendor = new Vendor({name: "zoe", password: "zero"});
// newVendor.save(function(err) {
//   if (err) throw err;
//
//   console.log('vendor created!');
// });
//
// console.log(newVendor);



app.get('/', function (req,res) {
   res.send('connected!')
})

app.get('/test', function(req,res) {
   Vendor.find({})
      .then(function (vendors) {
        console.log("successful query from db");
        res.json(vendors);
      })
      .catch(function (err) {
        res.send("UGHHHHH", err);
      })
});


app.listen(3000, function(){
  console.log('Started express application!')
});
