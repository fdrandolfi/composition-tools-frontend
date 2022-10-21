import NOTES_EXTENDED from '../notes/notesExtended';

/**
 * Returns an array of notes that complete the scale defined by the pattern
 *
 * @param {Number} noteId - The base note id
 * @param {Array} scalePattern - The binary pattern to define scale
 * @returns {Array} The array of scale notes
 */
const getScaleNotesByPattern = (noteId, scalePattern) => {
  const scaleNoteAdjust = 12;
  const scaleResult = [NOTES_EXTENDED[noteId + scaleNoteAdjust].id - 1];
  const scaleNotes = [];

  scalePattern.forEach((step) => {
    scaleResult.push(scaleResult[scaleResult.length - 1] + (step + 1));
  });

  scaleResult.forEach((note) => {
    scaleNotes.push(NOTES_EXTENDED[note - 1].name);
  });

  return scaleNotes;
};

export default getScaleNotesByPattern;
