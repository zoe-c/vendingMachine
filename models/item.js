const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const itemSchema = new mongoose.Schema({
   name: {
      type: String
      // required: true
   },
   price: {
      type: Number
      // required: true
   },
   num_available: {
      type: Number
   }
});


const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
// module.exports = itemSchema;
