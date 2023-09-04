const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
  heading: { type: String, required: true },
  note: { type: String, required: true },
  tag: { type: String, required: true },
  userId: { type: String, required: true },
});

const Notesmodel = mongoose.model("note", notesSchema);

module.exports = {
  Notesmodel,
};
