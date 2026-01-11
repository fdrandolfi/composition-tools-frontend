/**
 * Exercises Structure
 * Similar to scales structure but for exercises
 */

/**
 * Returns a list of exercises
 *
 * @returns {Array} The exercise options
 */
const getExerciseList = () => {
  // Por ahora vacío, se puede agregar contenido después
  return [];
};

/**
 * Returns an exercise label
 *
 * @param {String} exerciseId - The exercise id
 * @returns {String} The exercise label
 */
const getExerciseLabel = (exerciseId) => {
  // Por ahora retorna el ID en mayúsculas
  return exerciseId ? exerciseId.replace('_', ' ').toUpperCase() : '';
};

export {
  getExerciseList,
  getExerciseLabel,
};
