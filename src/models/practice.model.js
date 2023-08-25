const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  repo: {
    type: String,
    required: true,
    match:
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
  },
  koder: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    trim: true,
    ref: "koder",
  },
  created: {
    type: Date,
    required: true,
    default: new Date(),
  },
  updated: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

module.exports = mongoose.model("practice", practiceSchema);
