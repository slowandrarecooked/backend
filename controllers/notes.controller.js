const express = require("express");
const bcrypt = require("bcrypt");
const noteController = express.Router();
const jwt = require("jsonwebtoken");
const { Notesmodel } = require("../models/notes.model");
noteController.get("/", async (req, res) => {
  const notes = await Notesmodel.find({ userId: req.body.userId });
  res.send(notes);
});
noteController.post("/create", async (req, res) => {
  const { heading, note, tag } = req.body;
  const newnotes = new Notesmodel({
    heading,
    note,
    tag,
    userId: req.body.userId,
  });
  try {
    await newnotes.save();
    res.send("note added");
  } catch (error) {
    res.send("couldnt add note");
    console.log(error);
  }
});
noteController.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const deleted = await Notesmodel.deleteOne({
    userId: req.body.userId,
    _id: noteId,
  });

  if (deleted.deletedCount > 0) {
    res.send("deleted");
  } else {
    res.send("not authorized to delete");
  }
});
noteController.patch("/patch/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const update = await Notesmodel.updateOne(
    {
      userId: req.body.userId,
      _id: noteId,
    },
    {
      ...req.body,
    }
  );
  if (update) {
    res.send("updated");
  } else {
    res.send("not authorized to update");
  }
});
module.exports = {
  noteController,
};
