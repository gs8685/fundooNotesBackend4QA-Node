import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/notes.service';

/**
 * Controller to create a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const createNote = async (req, res, next) => {
  try {
    const data = await NoteService.createNote(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to get all notes available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await NoteService.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All notes fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};
/**
 * Controller to get a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'note fetched successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to update a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note updated successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'enter the correct note id'
    });
  }
};

/**
 * Controller to delete a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNote = async (req, res, next) => {
  try {
    await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Note deleted successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'note not found'
    });
  }
};

/**
 * Controller to archieve a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archiveNote = async (req, res, next) => {
  try {
    const data = await NoteService.archiveNote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note archived successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'enter the correct note id'
    });
  }
};

/**
 * Controller to archieve a note
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trashNote = async (req, res, next) => {
  try {
    const data = await NoteService.trashNote(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'note trashed successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: 'enter the correct note id'
    });
  }
};
