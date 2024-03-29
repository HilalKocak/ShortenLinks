const mongoose = require('mongoose')
const { Schema } = mongoose; 
const UserSchema = new Schema({
  name: {
    type: String,
    required: true 
  },
  email: String,
  password: {
    type: String,
    required: true 
  },
});

UserSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('User', UserSchema)

