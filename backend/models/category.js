const mongoose = require('mongoose')
const { Schema } = mongoose; 
const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true 
  }

});

CategorySchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('Category', CategorySchema)

