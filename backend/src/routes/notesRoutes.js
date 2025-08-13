import express from 'express';
import { 
  getAllNotes, 
  createANote, 
  updateANote, 
  deleteANote 
} from '../controllers/notesController.js';

const router = express.Router();

// GET /api/notes - Get all notes
router.get('/', getAllNotes);

// POST /api/notes - Create a new note
router.post('/', createANote);

// PUT /api/notes/:id - Update a note by ID
router.put('/:id', updateANote);

// DELETE /api/notes/:id - Delete a note by ID
router.delete('/:id', deleteANote);

export default router;