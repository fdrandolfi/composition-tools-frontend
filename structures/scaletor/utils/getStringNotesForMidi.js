/* eslint-disable no-plusplus */
import NOTES_EXTENDED_FOR_MIDI from '../../commons/notes/noteExtendedForMidi';

/**
 * Returns an array of notes for a string based on tuning data using NOTES_EXTENDED_FOR_MIDI
 * This function is for tunings and considers octave information
 *
 * @param {Number|Object} stringTuning - The tuning data: can be noteId (number) or object with {id, octave, midiId} from getNoteDataById
 * @param {Number} stepsNumber - The number of frets to generate
 * @returns {Array} The array of string notes [fret1, fret2, ..., fretN]
 */
const getStringNotesForMidi = (stringTuning, stepsNumber) => {
  let noteId;
  let octave;
  let baseIndex;

  if (typeof stringTuning === 'object' && stringTuning.id !== undefined) {
    noteId = stringTuning.id;
    octave = stringTuning.octave;
    
    const noteInOctave = NOTES_EXTENDED_FOR_MIDI.find((note) => note.id === noteId && note.octave === octave);
    if (!noteInOctave) {
      return Array(stepsNumber).fill('?');
    }
    baseIndex = NOTES_EXTENDED_FOR_MIDI.indexOf(noteInOctave);
  } else {
    noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
    const firstNoteWithId = NOTES_EXTENDED_FOR_MIDI.find((note) => note.id === noteId);
    if (!firstNoteWithId) {
      return Array(stepsNumber).fill('?');
    }
    baseIndex = NOTES_EXTENDED_FOR_MIDI.indexOf(firstNoteWithId);
  }

  const stringNotes = [];
  for (let i = 0; i < stepsNumber; i++) {
    const currentIndex = baseIndex + i;
    if (currentIndex < NOTES_EXTENDED_FOR_MIDI.length) {
      stringNotes.push(NOTES_EXTENDED_FOR_MIDI[currentIndex].name);
    } else {
      stringNotes.push('?');
    }
  }

  return stringNotes;
};

export default getStringNotesForMidi;
