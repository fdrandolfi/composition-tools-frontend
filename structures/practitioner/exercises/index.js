// Basic exercises
// 6 Strings
import all_6 from './figures/tests/six/all';
import spider_6 from './figures/warm-up/six/spider';
import little_finger_strength_6 from './figures/warm-up/six/little_finger_strength';

/**
 * Exercises organized by strings and category
 */
const exercises = {
  6: {
    tests: {
      all: all_6,
    },
    'warm-up': {
      spider: spider_6,
      little_finger_strength: little_finger_strength_6,
    },
  },
};

/**
 * Returns an exercise by value (format: 'category_exerciseId')
 *
 * @param {String} exerciseValue - The exercise value (format: 'category_exerciseId')
 * @param {Number} strings - The strings number from template
 * @returns {Object} The exercise data
 */
const getExercise = (exerciseValue, strings) => {
  if (!exerciseValue || !exercises[strings]) {
    return null;
  }
  
  // Dividir solo en el primer '_' para manejar nombres de ejercicios con guiones bajos
  const firstUnderscoreIndex = exerciseValue.indexOf('_');
  if (firstUnderscoreIndex === -1) {
    return null;
  }
  
  const category = exerciseValue.substring(0, firstUnderscoreIndex);
  const exerciseId = exerciseValue.substring(firstUnderscoreIndex + 1);
  
  if (exercises[strings][category] && exercises[strings][category][exerciseId]) {
    return exercises[strings][category][exerciseId];
  }
  return null;
};

/**
 * Returns a list of exercises grouped by category
 *
 * @param {Number} strings - The strings number from template
 * @returns {Array} The exercise options grouped by category (for react-select)
 */
const getExerciseList = (strings) => {
  if (!exercises[strings]) {
    return [];
  }

  const resultList = [];
  
  // Iterate over categories
  Object.keys(exercises[strings]).forEach((category) => {
    const categoryExercises = [];
    
    // Iterate over exercises in each category
    Object.keys(exercises[strings][category]).forEach((exerciseId) => {
      categoryExercises.push({
        label: normalizeExerciseLabel(exerciseId),
        value: `${category}_${exerciseId}`, // Combine category and exercise for the value
      });
    });

    if (categoryExercises.length > 0) {
      resultList.push({
        label: normalizeCategoryLabel(category),
        options: categoryExercises,
      });
    }
  });

  return resultList;
};

/**
 * Normalizes category label
 *
 * @param {String} category - The category id
 * @returns {String} The normalized label
 */
const normalizeCategoryLabel = (category) => {
  return category
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .toUpperCase();
};

/**
 * Normalizes exercise label (capitalized, first letter uppercase)
 *
 * @param {String} exerciseId - The exercise id
 * @returns {String} The normalized label (capitalized)
 */
const normalizeExerciseLabel = (exerciseId) => {
  return exerciseId
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Returns an exercise label (without category, only exercise name)
 *
 * @param {String} exerciseValue - The exercise value (format: 'category_exerciseId')
 * @returns {String} The exercise label (only exercise name, not category)
 */
const getExerciseLabel = (exerciseValue) => {
  if (!exerciseValue) return '';
  
  // Split only on the first '_' to handle exercise names with underscores
  const firstUnderscoreIndex = exerciseValue.indexOf('_');
  if (firstUnderscoreIndex === -1) {
    // Capitalize if there's no category
    return exerciseValue
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  const exerciseId = exerciseValue.substring(firstUnderscoreIndex + 1);
  return normalizeExerciseLabel(exerciseId);
};

export {
  getExercise,
  getExerciseList,
  getExerciseLabel,
};
