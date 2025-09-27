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
  return tunningLabel
    .replace('_', ' ')
    .replace('_', ' ')
    .replace('_', ' ')
    .replace('_', ' ')
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
 * Returns a label of pattern
 *
 * @param {Array} pattern - The array pattern
 * @param {Number} strings - The strings value by template
 * @returns {String} The label of pattern
 */
const getTunningLabelByPattern = (pattern, strings) => {
  const tuning = tunnings[strings];

  if (tuning) {
    // eslint-disable-next-line no-unused-vars
    const entry = Object.entries(tuning).find(([label, values]) => Array.isArray(values)
          && values.length === pattern.length
          && values.every((value, index) => value === pattern[index]));

    return entry ? normalizeTunningLabel(entry[0]) : null;
  }

  return null;
};

/**
 * Returns a tunning id of pattern
 *
 * @param {Array} pattern - The array pattern
 * @param {Number} strings - The strings value by template
 * @returns {String} The label of tunning id
 */
const getTunningIdByPattern = (pattern, strings) => {
  for (const id in tunnings) {
    if (parseInt(id) === strings) {
      for (const label in tunnings[id]) {
        if (JSON.stringify(tunnings[id][label]) === JSON.stringify(pattern)) {
          return label;
        }
      }
    }
  }

  return null;
};

export {
  getTunning, getTunningList, getTunningLabelByPattern, getTunningIdByPattern,
};
