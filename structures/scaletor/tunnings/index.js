// Guitars
// 6 Strings
import standard_6 from './six/standard';
import d_standard_6 from './six/d_standard';
import drop_d_6 from './six/drop_d';
import drop_c_6 from './six/drop_c';
import drop_c_sharp_6 from './six/drop_c_sharp';
import drop_b_6 from './six/drop_b';
import drop_b_e_standard_6 from './six/drop_b_e_standard';
// 7 Strings
import standard_7 from './seven/standard';
import drop_a_7 from './seven/drop_a';
import drop_g_sharp_7 from './seven/drop_g_sharp';

// Bass
// 4 Strings
import standard_4 from './four/standard';
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
  },
  7: {
    standard: standard_7,
    drop_a: drop_a_7,
    'drop_g#': drop_g_sharp_7,
  },
};

/**
 * Returns an Array with notes
 *
 * @param {Number} tunningId - The tunning note id
 * @param {scaleId} strings - The strings number from template
 * @returns {Array} The array of scale notes
 */
const getTunning = (tunningId, strings) => tunnings[strings][tunningId] || tunnings[6].e_standard;

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
      label: tune.replace('_', ' ')
        .replace('_', ' ')
        .replace('_', ' ')
        .replace('_', ' ')
        .toUpperCase(),
      value: tune,
    });
  });
  return resultList;
};

export { getTunning, getTunningList };
