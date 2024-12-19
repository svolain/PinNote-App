// routes/noteRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const noteModel = require("../models/noteModel");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};

router.get("/", authenticate, async (req, res) => {
  try {
    const notes = await noteModel.getNotesByUserId(req.user.userId);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve notes" });
  }
});

router.post("/", authenticate, async (req, res) => {
  const { title, content } = req.body;
  try {
    const note = await noteModel.createNote(title, content, req.user.userId);
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: "Failed to create note" });
  }
});

router.delete("/:id", authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await noteModel.deleteNote(id, req.user.userId);
    if (deletedNote) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Note not found or not authorized" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
