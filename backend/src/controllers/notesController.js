import Note from "../models/Note.js"; // Importing the Note model

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Fetching all notes from the database and -1 for descending order to show latest notes first
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getAllNotesByID(req, res) {
  try {
    const note = await Note.findById(req.params.id); // Fetching a note by ID
    if(!note) {
      return res.status(404).json({ message: "Note not found" }); // If note not found, send 404
    }
    res.status(200).json(note); // Sending the found note as a response
  } catch (error) {
    console.error("Error in getAllNotesByID controller:", error); 
    res.status(500).json({ message: "Internal Server Error" }); // Catching errors
  }
}

export async function createANote(req, res) {
  try {
    const { title, content } = req.body; // Destructuring title and content from the request body
    const note = new Note({ title, content }); // Creating a new note instance with the request body
    const saveNote = await note.save();
    res.status(201).json(saveNote); // Sending the created note as a response 
  } catch (error) {
    console.error("Error in createANote controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateANote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true }); // Updating the note with the new data
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" }); //invalid id or some issue
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "Error updating note", error });
  }
}

export async function deleteANote(req, res) {
  try {
    const { title, content } = req.params;
    const deletedNote = await Note.findByIdAndDelete(req.params.id, { title, content });  // Deleting the note by ID
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" }); //invalid id or some issue
    }
    res.status(200).json({ message: "Note deleted successfully" }); // Sending success response
  } catch (error) {
    console.error("Error in deleteANote controller:", error);
    res.status(500).json({ message: "Error deleting note", error }); // Catching errors
  }
}