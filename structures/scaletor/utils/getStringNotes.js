/* eslint-disable no-plusplus */
import NOTES_EXTENDED from '../../commons/notes/notesExtended';

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

  // Start from index 1 (fret 1), not index 0 (fret 0 / open string tuning)
  // The open string tuning (fret 0) is already shown separately in the matrix__tunning section
  for (let i = firstNote.id + 1; i <= firstNote.id + stepsNumber; i++) {
    stringNotes.push(NOTES_EXTENDED[i].name);
  }

  return stringNotes;
};

export default getStringNotes;
