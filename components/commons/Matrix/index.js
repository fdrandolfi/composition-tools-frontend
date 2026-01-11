import React from 'react';
import classnames from 'classnames';

import { allTemplates } from '../../../structures/commons/templates';
import getStringNotes from '../../../structures/scaletor/utils/getStringNotes';
import { getScale } from '../../../structures/scaletor/scales';
import { getLabelByNote } from '../../../structures/commons/notes';

const Matrix = ({
  templateId, tunning, scale, withoutScale, templateMode, exercise,
}) => {
  const { strings } = allTemplates[templateId];
  const { steps } = allTemplates[templateId];
  
  // If there's an exercise, we work in tablature mode (practitioner)
  // If there's a scale, we work in scales mode (scaletor)
  const isExerciseMode = !!exercise;
  const availableScaleNotes = scale && !isExerciseMode ? getScale(scale.noteId, scale.scaleId) : null;
  
  // Create a map of active positions for exercises
  // The exercise uses string 1-6 (1=high, 6=low) and fret 1-N (1=first fret)
  // In Matrix, stringIndex 0 = lowest string, stringIndex 5 = highest string (for 6 strings)
  // fretIndex 0 = open string, fretIndex 1 = first fret
  const exercisePositions = {};
  if (exercise && exercise.figure) {
    exercise.figure.forEach((position) => {
      // position.string is 1-6 (1=high, 6=low)
      // position.fret is 1-N (1=first fret)
      // We need to convert to stringIndex and fretIndex
      const stringIndex = strings - position.string; // string 6 -> index 0, string 1 -> index 5
      const fretIndex = position.fret; // fret 1 -> index 1, fret 0 would be open string (index 0)
      const key = `${stringIndex}-${fretIndex}`;
      exercisePositions[key] = true;
    });
  }

  return (
    <div className={classnames(
      'matrix',
      `matrix__${templateId}`,
      withoutScale && 'matrix__without-scale',
      templateMode && 'matrix__template-right',
      isExerciseMode && 'matrix__exercise-mode',
    )}
    >
      <div className="matrix__tunning">
        {
          tunning.length > 1 && tunning.map((string, stringIndex) => {
            const stringNotes = getStringNotes(string, steps, 10);
            return (
              <div className={classnames(
                'matrix__tunning-note',
                { 'matrix__tunning--one': strings === 1 },
                { 'matrix__tunning--four': strings === 4 },
                { 'matrix__tunning--five': strings === 5 },
                { 'matrix__tunning--six': strings === 6 },
                { 'matrix__tunning--seven': strings === 7 },
                { 'matrix__tunning--eight': strings === 8 },
                { 'matrix__tunning-note--available': availableScaleNotes && availableScaleNotes.includes(stringNotes[0]) },
                { 'matrix__tunning-note--tonic': scale && getLabelByNote(scale.noteId) === stringNotes[0] },
              )}
              >
                <span>{stringNotes[0]}</span>
              </div>
            );
          })
        }
      </div>
      {
        tunning.map((string, stringIndex) => {
          const stringNotes = getStringNotes(string, steps, tunning.length === 1 ? 10 : 11);
          return (
            <div className={classnames(
              'matrix__string',
              { 'matrix__string--one': strings === 1 },
              { 'matrix__string--four': strings === 4 },
              { 'matrix__string--five': strings === 5 },
              { 'matrix__string--six': strings === 6 },
              { 'matrix__string--seven': strings === 7 },
              { 'matrix__string--eight': strings === 8 },
              `matrix__string-${stringIndex + 1}`,
            )}
            >
              {
                stringNotes.map((note, fretIndex) => {
                  // fretIndex 0 = open string, fretIndex 1 = first fret, etc.
                  const positionKey = `${stringIndex}-${fretIndex}`;
                  const isExercisePosition = isExerciseMode && exercisePositions[positionKey];
                  const isScaleNote = availableScaleNotes && availableScaleNotes.includes(note);
                  const isTonic = scale && availableScaleNotes && note === availableScaleNotes[0];

                  return (
                    <div
                      id={note}
                      key={`${stringIndex}-${fretIndex}`}
                      className={classnames(
                        'matrix__string-note',
                        { 'matrix__string-note--available': isScaleNote && !isExerciseMode },
                        { 'matrix__string-note--tonic': isTonic && !isExerciseMode },
                        { 'matrix__string-note--exercise': isExercisePosition },
                      )}
                    >
                      <span>{isExerciseMode && isExercisePosition ? fretIndex + 1 : note}</span>
                    </div>
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default Matrix;
