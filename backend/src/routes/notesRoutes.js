import express from 'express';  // ES module syntax
import { createANote, getAllNotes, updateANote, deleteANote } from '../controllers/notesController.js'; // Importing the controller functions

const router = express.Router();

router.get("/", getAllNotes);

router.post("/", createANote);

router.put("/:id", updateANote);

router.delete("/:id", deleteANote);

export default router;


/*app.post('/api/notes', (req, res) => {
  res.status(200).send('Notes created!');
});

app.put('/api/notes/:id', (req, res) => {
  res.status(200).send('Notes updated!');
});

app.delete('/api/notes/:id', (req, res) => {
  res.status(200).send('Notes deleted!');
});
*/