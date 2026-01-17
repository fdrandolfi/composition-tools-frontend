// Warmp Up Exercises
// 6 Strings
import all_6 from './figures/tests/six/all';
import spider_6 from './figures/warm-up/six/spider';
import little_finger_strength_6 from './figures/warm-up/six/little_finger_strength';

// Licks Exercises
// 6 Strings
import shred_b_neoclassical_minor from './figures/licks/six/shred_b_neoclassical_minor';
import shred_b_neoclassical_minor_I_grade_phrase from './figures/licks/six/shred_b_neoclassical_minor_I_grade_phrase';
import shred_b_neoclassical_minor_II_grade_phrase from './figures/licks/six/shred_b_neoclassical_minor_II_grade_phrase';
import shred_b_neoclassical_minor_bIV_grade_phrase from './figures/licks/six/shred_b_neoclassical_minor_bIV_grade_phrase';
import shred_b_neoclassical_minor_VI_grade_phrase from './figures/licks/six/shred_b_neoclassical_minor_VI_grade_phrase';
import shred_c_modern_runner_outside from './figures/licks/six/shred_c_modern_runner_outside';
import shred_c_runner_halfwhole_diminished from './figures/licks/six/shred_c_runner_halfwhole_diminished';
import shred_c_modern_runner_mixolydian_b6 from './figures/licks/six/shred_c_modern_runner_mixolydian_b6';
import shred_c_modern_pentatonic from './figures/licks/six/shred_c_modern_pentatonic';
import shred_g_cascade_pentatonic_major from './figures/licks/six/shred_g_cascade_pentatonic_major';

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
    licks: {
      b_neoclassical_minor: shred_b_neoclassical_minor,
      c_modern_runner_outside: shred_c_modern_runner_outside,
      c_runner_halfwhole_diminished: shred_c_runner_halfwhole_diminished,
      c_modern_runner_mixolydian_b6: shred_c_modern_runner_mixolydian_b6,
      c_modern_pentatonic: shred_c_modern_pentatonic,
      g_cascade_pentatonic_major: shred_g_cascade_pentatonic_major,
    },
    'licks-by-phrases': {
      b_neoclassical_minor_I_phrase: shred_b_neoclassical_minor_I_grade_phrase,
      b_neoclassical_minor_II_phrase: shred_b_neoclassical_minor_II_grade_phrase,
      b_neoclassical_minor_bIV_phrase: shred_b_neoclassical_minor_bIV_grade_phrase,
      b_neoclassical_minor_VI_phrase: shred_b_neoclassical_minor_VI_grade_phrase,
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
 * Words with 3 letters or less are displayed in uppercase
 *
 * @param {String} exerciseId - The exercise id
 * @returns {String} The normalized label (capitalized)
 */
const normalizeExerciseLabel = (exerciseId) => {
  return exerciseId
    .split('_')
    .map((word) => {
      // If word has 3 letters or less, display in uppercase
      if (word.length <= 3) {
        return word.toUpperCase();
      }
      // Otherwise, capitalize first letter and lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
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
      .map((word) => {
        // If word has 3 letters or less, display in uppercase
        if (word.length <= 3) {
          return word.toUpperCase();
        }
        // Otherwise, capitalize first letter and lowercase the rest
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(' ');
  }
  
  const exerciseId = exerciseValue.substring(firstUnderscoreIndex + 1);
  return normalizeExerciseLabel(exerciseId);
};

/**
 * Extracts tunning id from exercise tunning value
 * Converts format like "standard_6" to "standard" (removes the strings suffix)
 *
 * @param {String} exerciseTunning - The tunning value from exercise (format: 'tunningName_strings')
 * @param {Number} strings - The strings number from template
 * @returns {String|null} The tunning id or null
 */
const extractTunningIdFromExercise = (exerciseTunning, strings) => {
  if (!exerciseTunning || exerciseTunning === null) {
    return null;
  }
  
  // Format is "tunningName_strings" (e.g., "standard_6")
  // Remove the "_strings" suffix to get the tunning id
  const suffix = `_${strings}`;
  if (exerciseTunning.endsWith(suffix)) {
    return exerciseTunning.slice(0, -suffix.length);
  }
  
  return exerciseTunning;
};

/**
 * Returns a list of tunning ids that have exercises assigned (tunning !== null)
 *
 * @param {Number} strings - The strings number from template
 * @returns {Array} The list of unique tunning ids that have exercises
 */
const getTunningListForExercises = (strings) => {
  if (!exercises[strings]) {
    return [];
  }

  const tunningSet = new Set();
  
  // Iterate over all categories and exercises
  Object.keys(exercises[strings]).forEach((category) => {
    Object.keys(exercises[strings][category]).forEach((exerciseId) => {
      const exercise = exercises[strings][category][exerciseId];
      if (exercise && exercise.tunning !== null && exercise.tunning !== undefined) {
        const tunningId = extractTunningIdFromExercise(exercise.tunning, strings);
        if (tunningId) {
          tunningSet.add(tunningId);
        }
      }
    });
  });

  return Array.from(tunningSet);
};

/**
 * Checks if there are exercises available for a given number of strings
 *
 * @param {Number} strings - The strings number
 * @returns {Boolean} True if there are exercises available, false otherwise
 */
const hasExercisesForStrings = (strings) => {
  return exercises[strings] !== undefined && 
         Object.keys(exercises[strings]).length > 0;
};

export {
  getExercise,
  getExerciseList,
  getExerciseLabel,
  getTunningListForExercises,
  extractTunningIdFromExercise,
  hasExercisesForStrings,
};
