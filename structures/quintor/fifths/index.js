/* eslint-disable import/prefer-default-export */
import FIFTHS from './fifths';

/**
 * Returns an array of scale available notes
 *
 * @param {Number} fifthsId - The fifth id
 * @returns {Array} The array of fifths structures
 */
const getFifthById = (fifthsId) => FIFTHS[fifthsId];

export { getFifthById };
