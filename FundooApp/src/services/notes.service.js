import Notes from '../models/notes.model';
import { client } from '../config/redis';

//create a new note
export const createNote = async (body) => {
  await client.del('getAllNotes');
  const data = await Notes.create(body);
  return data;
};

//get all notes
export const getAllNotes = async (body) => {
  const data = await Notes.find({ userID: body.userID });
  await client.set('getAllNotes', JSON.stringify(data));
  return data;
};

//get a note by id
export const getNote = async (body, _id) => {
  const data = await Notes.findOne({ _id, userID: body.userID });
  return data;
};

//update a note
export const updateNote = async (body, _id) => {
  await client.del('getAllNotes');
  const data = await Notes.findByIdAndUpdate(
    {
      _id,
      userID: body.userID
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete a Single note
export const deleteNote = async (body, _id) => {
  await Notes.findByIdAndDelete({ _id, userID: body.userID });
  return '';
};

//archieve a note
export const archiveNote = async (body, _id) => {
  await client.del('getAllNotes');
  const note = await Notes.findOne({ _id, userID: body.userID });
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
export const trashNote = async (body, _id) => {
  await client.del('getAllNotes');
  const note = await Notes.findOne({ _id: _id, userID: body.userID });
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
