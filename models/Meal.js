const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
  },
  comments: [ObjectId],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Meal', mealSchema);
