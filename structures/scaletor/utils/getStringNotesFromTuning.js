/* eslint-disable no-plusplus */
import NOTES from '../../commons/notes/notes';

/**
 * Returns an array of notes for a string based on its actual tuning (noteId + octave)
 * Each string starts from its tuning octave and can extend up to 2 more octaves (24 frets max)
 * This ensures the notes displayed on the fretboard match the actual sounds played
 * The calculation matches exactly with getMIDINoteFromPosition to guarantee sound accuracy
 *
 * @param {Object} stringTuning - The tuning data for the string { noteId: number, octave: number }
 * @param {Number} stepsNumber - The number of frets or keys by template (typically up to 24)
 * @returns {Array} The array of string notes (one note per fret, starting from first fret)
 */
const getStringNotesFromTuning = (stringTuning, stepsNumber) => {
  // Handle both old format (number) and new format ({noteId, octave})
  const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
  const octave = typeof stringTuning === 'object' ? stringTuning.octave : undefined;

  // If no octave is provided, fall back to old behavior (this shouldn't happen for practitioner)
  if (octave === undefined) {
    // Fallback: use a default calculation (similar to old getStringNotes)
    // This maintains backward compatibility for scaletor mode if needed
    const stringNotes = [];
    let currentNoteId = noteId;
    
    for (let i = 0; i < stepsNumber; i++) {
      const noteIndex = (currentNoteId - 1) % 12;
      stringNotes.push(NOTES[noteIndex].name);
      currentNoteId++;
    }
    
    return stringNotes;
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

  // Semitone to Note ID mapping
  const semitoneToNoteId = {
    0: 4,   // C
    1: 5,   // C#
    2: 6,   // D
    3: 7,   // D#
    4: 8,   // E
    5: 9,   // F
    6: 10,  // F#
    7: 11,  // G
    8: 12,  // G#
    9: 1,   // A
    10: 2,  // A#
    11: 3,  // B
  };

  // Get the semitone value for the open string note
  const openNoteSemitone = noteIdToSemitone[noteId];
  if (openNoteSemitone === undefined) {
    return [];
  }

  // Calculate total semitones from C0 for the open string
  // This matches the calculation in getMIDINoteFromPosition
  // getMIDINoteFromPosition calculates: midiNote = 12 + (octave * 12) + openNoteSemitone + fret
  // To convert to semitones from C0: totalSemitones = midiNote - 12 = (octave * 12) + openNoteSemitone + fret
  // So for the open string (fret would be 0, but exercises use fret 1 for first fret):
  const openStringSemitonesFromC0 = (octave * 12) + openNoteSemitone;

  const stringNotes = [];

  // Calculate note for each fret position
  // Each string starts from its tuning octave and can extend up to 2 more octaves (24 frets max)
  // In the Matrix, fretIndex 0 = first fret (traste 1), fretIndex 1 = second fret (traste 2), etc.
  // In exercises, fret: 1 = first fret, fret: 2 = second fret, etc.
  // In getMIDINoteFromPosition: fret 1 = open string + 1 semitone, fret 2 = open string + 2 semitones, etc.
  // Matrix converts: fretIndex = position.fret - 1
  // So fret 1 (first fret) -> fretIndex 0, which should show note at open string + 1 semitone
  // This ensures fretIndex n corresponds to fret (n+1) which adds (n+1) semitones from open string
  for (let fretIndex = 0; fretIndex < stepsNumber; fretIndex++) {
    // fretIndex 0 = first fret (fret 1) = open string + 1 semitone
    // fretIndex 1 = second fret (fret 2) = open string + 2 semitones
    // fretIndex 23 = 24th fret = open string + 24 semitones = open string + 2 octaves
    // This matches getMIDINoteFromPosition where fret n adds n semitones from open string
    const fret = fretIndex + 1; // Convert 0-based fretIndex to 1-based fret number
    const totalSemitonesFromC0 = openStringSemitonesFromC0 + fret;
    
    // Calculate the octave and semitone within that octave
    // Each octave has 12 semitones, so divide by 12 to get the octave
    const noteOctave = Math.floor(totalSemitonesFromC0 / 12);
    const semitoneInOctave = totalSemitonesFromC0 % 12;
    
    // Get the note ID from the semitone within the octave
    // This correctly handles transitions between octaves (e.g., when we go from G# to A)
    const currentNoteId = semitoneToNoteId[semitoneInOctave];
    
    // Get the note name (same name can appear in different octaves, but we only show the name)
    const note = NOTES.find(n => n.id === currentNoteId);
    if (note) {
      stringNotes.push(note.name);
    }
  }

  return stringNotes;
};

export default getStringNotesFromTuning;