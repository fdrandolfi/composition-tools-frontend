import React from 'react';
import classnames from 'classnames';

import { allTemplates } from '../../../structures/commons/templates';
import getStringNotes from '../../../structures/scaletor/utils/getStringNotes';
import getStringNotesFromTuning from '../../../structures/scaletor/utils/getStringNotesFromTuning';
import { getScale } from '../../../structures/scaletor/scales';
import { getLabelByNote } from '../../../structures/commons/notes';

const Matrix = ({
  templateId, tunning, scale, withoutScale, templateMode, exercise, exerciseSwitch, activeNotePosition,
}) => {
  const { strings } = allTemplates[templateId];
  const { steps } = allTemplates[templateId];
  
  // If there's an exercise, we work in tablature mode (practitioner)
  // If there's a scale, we work in scales mode (scaletor)
  const isExerciseMode = !!exercise;
  const availableScaleNotes = scale && !isExerciseMode ? getScale(scale.noteId, scale.scaleId) : null;
  
  // Create a map of active positions for exercises
  // The exercise uses string 1-6 (1=high, 6=low) and fret 1-N (1=first fret)
  // In Matrix, stringIndex 0 = highest string, stringIndex 5 = lowest string (for 6 strings) - inverted mapping
  // fretIndex 0 = first fret (traste 1), fretIndex 1 = second fret (traste 2), etc.
  const exercisePositions = {};
  const exerciseFingers = {}; // Map to store finger numbers for each position
  if (exercise && exercise.figure) {
    exercise.figure.forEach((position) => {
      // position.string is 1-6 (1=high, 6=low)
      // position.fret is 1-N (1=first fret)
      // We need to convert to stringIndex and fretIndex
      // Matrix tunning array: index 0 = string 6 (low), index 5 = string 1 (high)
      const stringIndex = strings - position.string; // string 6 -> index 0, string 1 -> index 5
      const fretIndex = position.fret - 1; // fret 1 -> index 0, fret 2 -> index 1, etc.
      const key = `${stringIndex}-${fretIndex}`;
      exercisePositions[key] = true;
      if (position.finger !== undefined) {
        exerciseFingers[key] = position.finger;
      }
    });
  }

  // Reverse the tunning array for visual display (only for string rendering, not tuning notes)
  const reversedTunning = [...tunning].reverse();

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
          tunning.length > 1 && tunning.map((stringTuning, stringIndex) => {
            // Get the open string note (cuerda abierta) directly from tuning
            const hasOctave = typeof stringTuning === 'object' && typeof stringTuning.octave !== 'undefined';
            let openStringNote;
            
            if (hasOctave) {
              // Use getLabelByNote to get the note name from noteId
              const noteId = stringTuning.noteId;
              openStringNote = getLabelByNote(noteId);
            } else {
              // Fallback for old format
              const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
              openStringNote = getLabelByNote(noteId);
            }
            
            // Get string notes for the fretboard (for highlighting, but we use openStringNote for display)
            const stringNotes = hasOctave 
              ? getStringNotesFromTuning(stringTuning, steps)
              : getStringNotes(typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning, steps, 10);
            
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
                { 'matrix__tunning-note--tonic': scale && getLabelByNote(scale.noteId) === openStringNote },
              )}
              >
                <span>{openStringNote}</span>
              </div>
            );
          })
        }
      </div>
      {
        reversedTunning.map((stringTuning, reversedIndex) => {
          const stringIndex = tunning.length - 1 - reversedIndex;
          // Use the new function if tuning has octave, otherwise use old function for backward compatibility
          const hasOctave = typeof stringTuning === 'object' && typeof stringTuning.octave !== 'undefined';
          const stringNotes = hasOctave
            ? getStringNotesFromTuning(stringTuning, steps)
            : getStringNotes(typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning, steps, tunning.length === 1 ? 10 : 11);
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
                  // fretIndex 0 = first fret (traste 1), fretIndex 1 = second fret (traste 2), etc.
                  const positionKey = `${stringIndex}-${fretIndex}`;
                  const isExercisePosition = isExerciseMode && exercisePositions[positionKey];
                  const isScaleNote = availableScaleNotes && availableScaleNotes.includes(note);
                  const isTonic = scale && availableScaleNotes && note === availableScaleNotes[0];
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
