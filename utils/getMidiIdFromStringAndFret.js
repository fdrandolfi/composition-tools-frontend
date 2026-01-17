import NOTES_EXTENDED_FOR_MIDI from '../structures/commons/notes/noteExtendedForMidi';

/**
 * Calculates the MIDI ID for a note on a string at a specific fret
 * 
 * @param {Number|Object} stringTuning - The tuning data: can be noteId (number) or object with {id, octave, midiId}
 * @param {Number} fretIndex - The fret index (0 = fret 1, 1 = fret 2, etc.)
 * @returns {Number|null} The MIDI ID or null if not found
 */
const getMidiIdFromStringAndFret = (stringTuning, fretIndex) => {
  // fretIndex -1 = open string (fret 0)
  // fretIndex 0 = fret 1
  // fretIndex 1 = fret 2, etc.
  // So the actual fret number is fretIndex + 1
  const actualFret = fretIndex + 1;

  // Handle open string (fret 0)
  if (actualFret === 0) {
    if (typeof stringTuning === 'object' && stringTuning.midiId !== undefined) {
      return stringTuning.midiId;
    }
    // If we have the object with id and octave, find the MIDI ID
    if (typeof stringTuning === 'object' && stringTuning.id !== undefined && stringTuning.octave !== undefined) {
      const noteInOctave = NOTES_EXTENDED_FOR_MIDI.find((note) => note.id === stringTuning.id && note.octave === stringTuning.octave);
      if (noteInOctave) {
        return noteInOctave.midiId;
      }
    }
  }

  let baseIndex;

  if (typeof stringTuning === 'object' && stringTuning.id !== undefined) {
    const noteId = stringTuning.id;
    const octave = stringTuning.octave;
    
    const noteInOctave = NOTES_EXTENDED_FOR_MIDI.find((note) => note.id === noteId && note.octave === octave);
    if (!noteInOctave) {
      return null;
    }
    baseIndex = NOTES_EXTENDED_FOR_MIDI.indexOf(noteInOctave);
  } else {
    const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
    const firstNoteWithId = NOTES_EXTENDED_FOR_MIDI.find((note) => note.id === noteId);
    if (!firstNoteWithId) {
      return null;
    }
    baseIndex = NOTES_EXTENDED_FOR_MIDI.indexOf(firstNoteWithId);
  }

  // Calculate the index for the note at the specified fret
  // baseIndex is the open string (fret 0), so we add actualFret to get to the desired fret
  const targetIndex = baseIndex + actualFret;

  if (targetIndex >= 0 && targetIndex < NOTES_EXTENDED_FOR_MIDI.length) {
    return NOTES_EXTENDED_FOR_MIDI[targetIndex].midiId;
  }

  return null;
};

export default getMidiIdFromStringAndFret;
