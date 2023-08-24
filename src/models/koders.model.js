const mongoose = require("mongoose");

const kodersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Nombre es requerido"],
    minLength: [2, "Minimo 2 caractere"],
    maxLength: 50,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  program: {
    type: String,
    enum: ["javascript", "python", "ios"],
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("koder", kodersSchema);
