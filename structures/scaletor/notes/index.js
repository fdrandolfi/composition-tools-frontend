import NOTES from './notes';
import NOTES_EXTENDED from './notesExtended';

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

export { getLabelByNote, getNoteList };
