import { bool, boolean } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    color: {
      type: String
    },
    isArchived: {
      type: Boolean,
      default: false
    },
    isTrash: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('Notes', notesSchema);
