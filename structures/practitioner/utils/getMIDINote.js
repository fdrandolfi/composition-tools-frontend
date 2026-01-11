import { getNoteInfoFromStringAndFret } from '../../commons/midi';

/**
 * Gets the MIDI note number for a specific string and fret position
 * Simplificado - usa directamente el sistema MIDI unificado
 *
 * @param {Object} stringTuning - The tuning data for the string { noteId: number, octave: number }
 * @param {Number} fret - The fret number (0 = open string, 1 = first fret, up to 24)
 * @returns {Number|null} The MIDI note number
 */
export const getMIDINoteFromPosition = (stringTuning, fret) => {
  const noteInfo = getNoteInfoFromStringAndFret(stringTuning, fret);
  return noteInfo ? noteInfo.midiNote : null;
};
