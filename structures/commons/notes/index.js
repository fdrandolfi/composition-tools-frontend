import NOTES from './notes';
import NOTES_EXTENDED from './notesExtended';
import NOTES_EXTENDED_FOR_MIDI from './noteExtendedForMidi';

/**
 * Returns a label from note id
 *
 * @param {Number} noteId the note id
 * @returns {String} The label of the note
 */
const getLabelByNote = (noteId) => {
  let result = '';

  NOTES_EXTENDED.forEach((note) => {
    if (note.id === noteId) {
      result = note.name;
    }
  });

  return result;
};

/**
 * Returns an Array with notes
 *
 * @returns {Array} The array of notes
 */
const getNoteList = () => {
  const resultList = [];

  Object.keys(NOTES).forEach((note) => {
    resultList.push({
      label: NOTES[note].name,
      value: NOTES[note].id,
    });
  });

  return resultList;
};

/**
 * Returns a note data for MIDI by note id
 *
 * @param {Number} noteId - The note id
 * @returns {Object} The note data
 */
const getNoteDataById = (noteId) => {
  let result = {};

  NOTES_EXTENDED_FOR_MIDI.forEach((note) => {
    if (note.id === noteId) {
      result = note;
    }
  });

  return result;
};

export { getLabelByNote, getNoteList, getNoteDataById };

