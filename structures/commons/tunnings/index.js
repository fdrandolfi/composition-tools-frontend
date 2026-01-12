// Guitars
// 6 Strings
import standard_6 from './six/standard';
import d_standard_6 from './six/d_standard';
import drop_d_6 from './six/drop_d';
import drop_c_6 from './six/drop_c';
import drop_c_sharp_6 from './six/drop_c_sharp';
import drop_b_6 from './six/drop_b';
import drop_b_e_standard_6 from './six/drop_b_e_standard';
import drop_a_6 from './six/drop_a';
import drop_f_sharp_6 from './six/drop_f_sharp';
// 7 Strings
import standard_7 from './seven/standard';
import drop_a_7 from './seven/drop_a';
import drop_g_sharp_7 from './seven/drop_g_sharp';
import drop_f_sharp_7 from './seven/drop_f_sharp';
import drop_g_7 from './seven/drop_g';
// 8 Strings
import standard_8 from './eight/standard';
import drop_e_8 from './eight/drop_e';
import standard_d_sharp_8 from './eight/standard_d_sharp';

// Bass
// 4 Strings
import standard_4 from './four/standard';
import drop_c_4 from './four/drop_c';
import drop_d_4 from './four/drop_d';
// 5 Strings
import standard_5 from './five/standard';
import drop_c_5 from './five/drop_c';
import drop_d_5 from './five/drop_d';

// MIDI Controllers
import standard_1 from './one/standard';

/**
 * Tunnings
 */
const tunnings = {
  1: {
    standard: standard_1,
  },
  4: {
    standard: standard_4,
    drop_c: drop_c_4,
    drop_d: drop_d_4,
  },
  5: {
    standard: standard_5,
    drop_c: drop_c_5,
    drop_d: drop_d_5,
  },
  6: {
    standard: standard_6,
    d_standard: d_standard_6,
    drop_d: drop_d_6,
    drop_c: drop_c_6,
    'drop_c#': drop_c_sharp_6,
    drop_b: drop_b_6,
    'drop_b_&_e_standard': drop_b_e_standard_6,
    drop_a: drop_a_6,
    'drop_f#': drop_f_sharp_6,
  },
  7: {
    standard: standard_7,
    drop_a: drop_a_7,
    'drop_g#': drop_g_sharp_7,
    'drop_f#': drop_f_sharp_7,
    drop_g: drop_g_7,
  },
  8: {
    standard: standard_8,
    'drop_e': drop_e_8,
    'standard_d#': standard_d_sharp_8,
  },
};

/**
 * Returns an normalized label of tunning id
 *
 * @param {String} tunningLabel  - The tunning label
 * @returns {string} The label string
 */
const normalizeTunningLabel = (tunningLabel) => {
  if (!tunningLabel) {
    return '';
  }
  return tunningLabel
    .replace(/_/g, ' ')
    .replace(/#/g, '#')
    .replace(/&/g, '&')
    .toUpperCase();
}

/**
 * Returns an array with notes
 *
 * @param {Number} tunningId - The tunning note id
 * @param {Number} strings - The strings number from template
 * @returns {Array} The array of scale notes
 */
const getTunning = (tunningId, strings) => tunnings[strings][tunningId] || tunnings[6].standard;

/**
 * Returns a list of tunnings
 *
 * @param {scaleId} strings - The strings number from template
 * @returns {Array} The tunning options
 */
const getTunningList = (strings) => {
  const resultList = [];

  Object.keys(tunnings[strings]).forEach((tune) => {
    resultList.push({
      label: normalizeTunningLabel(tune),
      value: tune,
    });
  });

  return resultList;
};

/**
 * Normalizes a tuning value for comparison (handles both old format [number] and new format [{id, octave}])
 *
 * @param {Number|Object} value - The tuning value (number or object with id)
 * @returns {Number} The id value
 */
const normalizeTunningValue = (value) => {
  if (value === null || value === undefined) {
    return null;
  }
  return typeof value === 'object' ? (value.id || value.noteId) : value;
};

/**
 * Compares two tuning arrays to check if they match (normalizes both old and new formats)
 * Ignores the first value as it corresponds to the open string tuning (fret 0)
 *
 * @param {Array} values - Array of tuning values (can be old format [number] or new format [{id, octave}])
 * @param {Array} pattern - Array of pattern values (can be old format [number] or new format [{id, octave}])
 * @returns {Boolean} True if the arrays match (ignoring first element)
 */
const compareTunningArrays = (values, pattern) => {
  if (!Array.isArray(values) || !Array.isArray(pattern)) {
    return false;
  }
  
  // For single string tunings (MIDI), compare all values
  if (values.length === 1 && pattern.length === 1) {
    const normalizedValue = normalizeTunningValue(values[0]);
    const normalizedPattern = normalizeTunningValue(pattern[0]);
    return normalizedValue !== null && normalizedPattern !== null && normalizedValue === normalizedPattern;
  }
  
  // Both arrays should have the same length (number of strings)
  if (values.length !== pattern.length) {
    return false;
  }
  
  // When comparing tuning patterns, we need to skip the first element because:
  // - In the tuning array (values): each element is the open string tuning (fret 0)
  // - In the pattern array: if it comes from generated notes, index 0 = fret 0, index 1 = fret 1
  // - But we want to compare starting from fret 1 (space 1), not fret 0 (space 0)
  // - So we compare values starting from index 1 (second string) with pattern from index 1 (fret 1 of each string)
  // - Actually, we compare each tuning value with the note at fret 1 of the corresponding string
  // - So values[0] (first string open) should match the note at fret 1 of first string (pattern might need to be adjusted)
  
  // Actually, if pattern is generated from string notes where pattern[i][0] = fret 0 and pattern[i][1] = fret 1
  // But if pattern is just an array like tuning, then we skip first element
  // Let's assume pattern has the same structure as values (array of notes, one per string)
  // but we skip the first string's fret 0 note and compare from fret 1
  
  // Skip the first element (fret 0 / space 0) and compare from index 1 (fret 1 / space 1)
  const valuesToCompare = values.slice(1);
  const patternToCompare = pattern.slice(1);
  
  if (valuesToCompare.length === 0 || patternToCompare.length === 0) {
    return false;
  }
  
  if (valuesToCompare.length !== patternToCompare.length) {
    return false;
  }
  
  return valuesToCompare.every((value, index) => {
    const normalizedValue = normalizeTunningValue(value);
    const normalizedPattern = normalizeTunningValue(patternToCompare[index]);
    return normalizedValue !== null && normalizedPattern !== null && normalizedValue === normalizedPattern;
  });
};

/**
 * Finds a tuning entry that matches the given pattern
 *
 * @param {Array} pattern - The array pattern (can be old format [number] or new format [{id, octave}])
 * @param {Number} strings - The strings value by template
 * @returns {Object|null} The matching entry [label, values] or null
 */
const findTunningByPattern = (pattern, strings) => {
  if (!pattern || !Array.isArray(pattern) || pattern.length === 0) {
    return null;
  }

  const tuning = tunnings[strings];
  if (!tuning) {
    return null;
  }

  // eslint-disable-next-line no-unused-vars
  const entry = Object.entries(tuning).find(([label, values]) => {
    return compareTunningArrays(values, pattern);
  });

  return entry || null;
};

/**
 * Returns a label of pattern
 *
 * @param {Array} pattern - The array pattern (can be old format [number] or new format [{id, octave}])
 * @param {Number} strings - The strings value by template
 * @returns {String} The label of pattern
 */
const getTunningLabelByPattern = (pattern, strings) => {
  const entry = findTunningByPattern(pattern, strings);
  return entry ? normalizeTunningLabel(entry[0]) : null;
};

/**
 * Returns a tunning id of pattern
 *
 * @param {Array} pattern - The array pattern (can be old format [number] or new format [{id, octave}])
 * @param {Number} strings - The strings value by template
 * @returns {String} The label of tunning id
 */
const getTunningIdByPattern = (pattern, strings) => {
  const entry = findTunningByPattern(pattern, strings);
  return entry ? entry[0] : null;
};

export {
  getTunning, getTunningList, getTunningLabelByPattern, getTunningIdByPattern,
};
