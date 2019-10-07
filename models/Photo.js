var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var photoSchema = new Schema({
  url: { type: String, required: true },
});

module.exports = mongoose.model('Photos', photoSchema);
