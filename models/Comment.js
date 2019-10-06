const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  postedBy: {
    type: ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [ObjectId]
});

module.exports = mongoose.model('Comment', commentSchema);
