const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const vendorSchema= new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
});

vendorSchema.pre('save', function (next) {
   if (!this.isModified('password')) {
      return next();
   }
   var hash = bcrypt.hashSync(this.password, 8);
   this.password = hash;
   next();
})

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
