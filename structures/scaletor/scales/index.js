import without from './patterns/without';

import major from './patterns/major';
import minor from './patterns/minor';
import harmonic_major from './patterns/harmonic_major';
import harmonic_minor from './patterns/harmonic_minor';
import pentatonic_major from './patterns/pentatonic_major';
import pentatonic_minor from './patterns/pentatonic_minor';
import blues_major from './patterns/blues_major';
import blues_minor from './patterns/blues_minor';
import bebop from './patterns/bebop';
import spanish from './patterns/spanish';
import arabian from './patterns/arabian';
import egyptian from './patterns/egyptian';

import i_ionian from './patterns/modes/i_ionian';
import ii_dorian from './patterns/modes/ii_dorian';
import iii_phrygian from './patterns/modes/iii_phrygian';
import iv_lydian from './patterns/modes/iv_lydian';
import v_mixolydian from './patterns/modes/v_mixolydian';
import vi_aeolian from './patterns/modes/vi_aeolian';
import vii_locrian from './patterns/modes/vii_locrian';

import getScaleNotesByPattern from '../utils/getScaleNotesByPattern';

/**
 * Scale Patterns
 */
const scalePatterns = {
  major,
  minor,
  harmonic_major,
  harmonic_minor,
  pentatonic_major,
  pentatonic_minor,
  blues_major,
  blues_minor,
  bebop,
  spanish,
  arabian,
  egyptian,
};

/**
 * Scale Modes Patterns
 */
const scaleModesPatterns = {
  i_ionian,
  ii_dorian,
  iii_phrygian,
  iv_lydian,
  v_mixolydian,
  vi_aeolian,
  vii_locrian,
};

/**
 * All Patterns
 */
const allPatterns = {
  without,
  ...scalePatterns,
  ...scaleModesPatterns,
};

/**
 * Returns an array of scale available notes
 *
 * @param {Number} noteId - The base note id
 * @param {scaleId} scaleId - The scale type id
 * @returns {Array} The array of scale notes
 */
const getScale = (noteId, scaleId) => getScaleNotesByPattern(noteId, allPatterns[scaleId]);

/**
 * Returns a list of scales
 *
 * @returns {Array} The scale options
 */
const getScaleList = () => {
  const resultList = [];
  Object.keys(scalePatterns).forEach((scale) => {
    resultList.push({
      label: scale.replace('_', ' ').toUpperCase(),
      value: scale,
    });
  });
  return resultList;
};

/**
 * Returns a list of scales modes
 *
 * @returns {Array} The scale options
 */
const getScaleModesList = () => {
  const resultList = [];
  Object.keys(scaleModesPatterns).forEach((scale) => {
    resultList.push({
      label: scale.replace('_', ' ').toUpperCase(),
      value: scale,
    });
  });
  return resultList;
};

export { getScale, getScaleList, getScaleModesList };
