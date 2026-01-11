/**
 * Gets the MIDI note number for a specific string and fret position
 * Uses the octave from the tuning data
 * Each string starts from its tuning octave and can extend up to 2 more octaves (24 frets max)
 * Simply adds semitones (fret offset) to the open string MIDI note
 *
 * @param {Object} stringTuning - The tuning data for the string { noteId: number, octave: number }
 * @param {Number} fret - The fret number (1-based: 1 = first fret, up to 24 = 24th fret)
 * @returns {Number} The MIDI note number
 */
export const getMIDINoteFromPosition = (stringTuning, fret) => {
  if (!stringTuning || typeof stringTuning.noteId === 'undefined' || typeof stringTuning.octave === 'undefined') {
    return null;
  }

  // Note ID to semitone mapping (C=0, C#=1, D=2, D#=3, E=4, F=5, F#=6, G=7, G#=8, A=9, A#=10, B=11)
  // Note IDs: 1=A, 2=A#, 3=B, 4=C, 5=C#, 6=D, 7=D#, 8=E, 9=F, 10=F#, 11=G, 12=G#
  const noteIdToSemitone = {
    1: 9,   // A
    2: 10,  // A#
    3: 11,  // B
    4: 0,   // C
    5: 1,   // C#
    6: 2,   // D
    7: 3,   // D#
    8: 4,   // E
    9: 5,   // F
    10: 6,  // F#
    11: 7,  // G
    12: 8,  // G#
  };

  // Get the semitone value for the open string note
  const openNoteSemitone = noteIdToSemitone[stringTuning.noteId];
  if (openNoteSemitone === undefined) {
    return null;
  }

  // Calculate MIDI note number for the open string
  // MIDI standard: C0 = 12, C1 = 24, C2 = 36, etc.
  // Formula: MIDI = 12 + (octave * 12) + semitone
  const openNoteMIDI = 12 + (stringTuning.octave * 12) + openNoteSemitone;

  // Add fret offset (each fret = 1 semitone)
  // Fret 1 = first fret = +1 semitone from open string
  // Fret 2 = second fret = +2 semitones from open string
  // Fret 24 = 24th fret = +24 semitones from open string = +2 octaves from open string
  // This ensures each fret produces the correct sound matching the note displayed on the fretboard
  // fret 0 would be open string = +0 semitones, but exercises use fret 1 for first fret
  return openNoteMIDI + fret;
};
