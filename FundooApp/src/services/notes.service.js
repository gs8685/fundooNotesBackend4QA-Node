import Notes from '../models/notes.model';

//create a new note
export const createNote = async (body) => {
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async () => {
  const data = await Notes.find();
  return data;
};

//get a note by id
export const getNote = async (_id) => {
  const data = await Notes.findOne({ _id: _id });
  return data;
};

//update a note
export const updateNote = async (_id, body) => {
  const data = await Notes.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete a Single note
export const deleteNote = async (id) => {
  await Notes.findByIdAndDelete(id);
  return '';
};

//archieve a note
export const archiveNote = async (_id) => {
  const note = await Notes.findOne({ _id: _id });
  const isArchived = note.isArchived === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id
    },
    { isArchived: isArchived },
    {
      new: true
    }
  );
  return data;
};

//trash a note
export const trashNote = async (_id) => {
  const note = await Notes.findOne({ _id: _id });
  const isTrash = note.isTrash === false ? true : false;
  const data = await Notes.findByIdAndUpdate(
    {
      _id
    },
    { isTrash: isTrash },
    {
      new: true
    }
  );
  return data;
};
