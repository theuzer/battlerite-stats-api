const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PlayerIndexedSchema = new Schema({
  playerCode: String,
  playerName: {
    type: String,
    index: { unique: true },
  },
});

module.exports = mongoose.model('PlayerIndexed', PlayerIndexedSchema);
