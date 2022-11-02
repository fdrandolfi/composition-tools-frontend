/* eslint-disable import/prefer-default-export */
import NOTES from './notes';

/**
 * Returns an Array with notes
 *
 * @returns {Array} The array of notes
 */
const getNoteList = () => {
  const resultList = [];
  Object.keys(NOTES).forEach((note) => {
    resultList.push({
      label: NOTES[note].name,
      value: NOTES[note].id,
    });
  });
  return resultList;
};

export { getNoteList };
