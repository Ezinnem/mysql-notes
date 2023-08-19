const express = require('express');
const router = express.Router();
const { updateOneNote, createNote, getAllNotes, getOneNote, deleteOneNote } = require("../controller/note-controller");

router.post("/notes", createNote);
router.get("/notes", getAllNotes);
router.get("/notes/:id", getOneNote);
router.put("/notes/:id", updateOneNote);
router.delete("/notes/:id", deleteOneNote);

module.exports = router;