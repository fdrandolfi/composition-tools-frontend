/* eslint-disable no-plusplus */
import NOTES_EXTENDED from '../notes/notesExtended';

/**
 * Returns an array of notes that complete the scale of a string
 *
 * @param {Number} noteId - The first note id
 * @param {Number} stepsNumber - The number of frets or keys by template
 * @param {Number} scaleNoteAdjust - If need adjust scale
 * @returns {Array} The array of string notes
 */
const getStringNotes = (noteId, stepsNumber, scaleNoteAdjust = 12) => {
  const firstNote = NOTES_EXTENDED[noteId + scaleNoteAdjust];
  const stringNotes = [];

  for (let i = firstNote.id; i < firstNote.id + stepsNumber; i++) {
    stringNotes.push(NOTES_EXTENDED[i].name);
  }

  return stringNotes;
};

export default getStringNotes;
