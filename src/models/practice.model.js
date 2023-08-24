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
});

module.exports = mongoose.model("practice", practiceSchema);
