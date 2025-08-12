export const getAllNotes = (req, res) => {
  res.status(200).json({ message: "Get all notes" });
};

export const createANote = (req, res) => {
  res.status(201).json({ message: "Note created" });
};

export const updateANote = (req, res) => {
  res.status(200).json({ message: `Note ${req.params.id} updated` });
};

export const deleteANote = (req, res) => {
  res.status(200).json({ message: `Note ${req.params.id} deleted` });
};