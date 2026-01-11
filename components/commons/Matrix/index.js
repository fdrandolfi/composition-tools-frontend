import React from 'react';
import classnames from 'classnames';

import { allTemplates } from '../../../structures/commons/templates';
import getStringNotes from '../../../structures/scaletor/utils/getStringNotes';
import { getScale } from '../../../structures/scaletor/scales';
import { getLabelByNote } from '../../../structures/commons/notes';

const Matrix = ({
  templateId, tunning, scale, withoutScale, templateMode, exercise, exerciseSwitch, activeNotePosition,
}) => {
  const { strings } = allTemplates[templateId];
  const { steps } = allTemplates[templateId];
  
  const isExerciseMode = !!exercise;
  const availableScaleNotes = scale && !isExerciseMode && scale.scaleId !== 'without' ? getScale(scale.noteId, scale.scaleId) : null;
  
  const exercisePositions = {};
  const exerciseFingers = {};
  if (exercise && exercise.figure) {
    exercise.figure.forEach((position) => {
      const stringIndex = strings - position.string;
      const fretIndex = position.fret - 1;
      const key = `${stringIndex}-${fretIndex}`;
      exercisePositions[key] = true;
      if (position.finger !== undefined) {
        exerciseFingers[key] = position.finger;
      }
    });
  }

  const displayTunning = tunning;

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
          displayTunning.length > 1 && displayTunning.map((stringTuning, displayIndex) => {
            const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
            const openStringNote = getLabelByNote(noteId);
            const stringNotes = getStringNotes(noteId, steps, 10);
            
            return (
              <div className={classnames(
                'matrix__tunning-note',
                { 'matrix__tunning--one': strings === 1 },
                { 'matrix__tunning--four': strings === 4 },
                { 'matrix__tunning--five': strings === 5 },
                { 'matrix__tunning--six': strings === 6 },
                { 'matrix__tunning--seven': strings === 7 },
                { 'matrix__tunning--eight': strings === 8 },
                { 'matrix__tunning-note--available': availableScaleNotes && availableScaleNotes.includes(openStringNote) },
                { 'matrix__tunning-note--tonic': scale && scale.scaleId !== 'without' && getLabelByNote(scale.noteId) === openStringNote },
              )}
              >
                <span>{openStringNote}</span>
              </div>
            );
          })
        }
      </div>
      {
        displayTunning.map((stringTuning, displayIndex) => {
          const originalIndex = displayIndex;
          const stringIndex = originalIndex;
          
          const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
          const stringNotes = getStringNotes(noteId, steps, tunning.length === 1 ? 10 : 11);
          
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
                  const positionKey = `${stringIndex}-${fretIndex}`;
                  const isExercisePosition = isExerciseMode && exercisePositions[positionKey];
                  const isScaleNote = availableScaleNotes && availableScaleNotes.includes(note);
                  const isTonic = scale && scale.scaleId !== 'without' && availableScaleNotes && note === availableScaleNotes[0];
                  const isActiveNote = activeNotePosition === positionKey;

                  return (
                    <div
                      id={note}
                      key={`${stringIndex}-${fretIndex}`}
                      className={classnames(
                        'matrix__string-note',
                        { 'matrix__string-note--available': isScaleNote && !isExerciseMode },
                        { 'matrix__string-note--tonic': isTonic && !isExerciseMode },
                        { 'matrix__string-note--exercise': isExercisePosition },
                        { 'matrix__string-note--active': isActiveNote },
                      )}
                    >
                      <span>
                        {isExerciseMode && isExercisePosition
                          ? (exerciseSwitch ? fretIndex + 1 : note)
                          : note}
                      </span>
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
