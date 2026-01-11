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
  
  // If there's an exercise, we work in tablature mode (practitioner)
  // If there's a scale, we work in scales mode (scaletor)
  const isExerciseMode = !!exercise;
  const availableScaleNotes = scale && !isExerciseMode && scale.scaleId !== 'without' ? getScale(scale.noteId, scale.scaleId) : null;
  
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

  // Orden de cuerdas:
  // - Array tunning: index 0 = cuerda más gorda (string 6), index N-1 = cuerda más fina (string 1)
  // - Scaletor: mostrar más fina arriba, más gorda abajo (NO invertir, ya está en orden visual correcto)
  // - Practitioner: mostrar más gorda arriba, más fina abajo (invertir para visualización)
  const displayTunning = isExerciseMode ? [...tunning].reverse() : tunning;

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
            // Get the open string note (cuerda abierta) directly from tuning
            // Handle both old format (number) and new format ({noteId, octave})
            const noteId = typeof stringTuning === 'object' ? stringTuning.noteId : stringTuning;
            const openStringNote = getLabelByNote(noteId);
            
            // Get string notes for the fretboard using getStringNotes
            const stringNotes = getStringNotes(noteId, steps, 10);
            
            // Calcular el índice original en el array tunning
            // Para scaletor (isExerciseMode = false): displayIndex es igual al índice original
            // Para practitioner (isExerciseMode = true): displayIndex es el índice invertido
            const originalIndex = isExerciseMode ? (tunning.length - 1 - displayIndex) : displayIndex;
            
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
          // Calcular el índice real en el array original para las posiciones
          // Para scaletor (isExerciseMode = false): displayIndex es igual al índice original
          //   - displayIndex 0 = cuerda más gorda (index 0, string 6)
          //   - displayIndex N-1 = cuerda más fina (index N-1, string 1)
          // Para practitioner (isExerciseMode = true): displayIndex es el índice invertido
          //   - displayIndex 0 = cuerda más fina (última en array original = index N-1, string 1)
          //   - displayIndex N-1 = cuerda más gorda (primera en array original = index 0, string 6)
          const originalIndex = isExerciseMode ? (tunning.length - 1 - displayIndex) : displayIndex;
          const stringIndex = originalIndex;
          
          // Handle both old format (number) and new format ({noteId, octave})
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
                  // fretIndex 0 = first fret (traste 1), fretIndex 1 = second fret (traste 2), etc.
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
