import React from 'react';
import classnames from 'classnames';

import { allTemplates } from '../../../structures/scaletor/templates';
import getStringNotes from '../../../structures/scaletor/utils/getStringNotes';
import { getScale } from '../../../structures/scaletor/scales';
import { getLabelByNote } from '../../../structures/scaletor/notes';

const Matrix = ({
  templateId, tunning, scale, withoutScale, templateMode,
}) => {
  const { strings } = allTemplates[templateId];
  const { steps } = allTemplates[templateId];
  const availableScaleNotes = scale && getScale(scale.noteId, scale.scaleId);
  return (
    <div className={classnames(
      'matrix',
      `matrix__${templateId}`,
      withoutScale && 'matrix__without-scale',
      templateMode && 'matrix__template-mode',
    )}
    >
      <div className="matrix__tunning">
        {
          tunning.length > 1 && tunning.map((string) => {
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
                { 'matrix__tunning-note--available': availableScaleNotes.includes(stringNotes[0]) },
                { 'matrix__tunning-note--tonic': getLabelByNote(scale.noteId) === stringNotes[0] },
              )}
              >
                <span>{stringNotes[0]}</span>
              </div>
            );
          })
        }
      </div>
      {
        tunning.map((string, i) => {
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
              `matrix__string-${i + 1}`,
            )}
            >
              {
                stringNotes.map((note) => (
                  <div
                    id={note}
                    className={classnames(
                      'matrix__string-note',
                      { 'matrix__string-note--available': availableScaleNotes.includes(note) },
                      { 'matrix__string-note--tonic': note === availableScaleNotes[0] },
                    )}
                  >
                    <span>{note}</span>
                  </div>
                ))
              }
            </div>
          );
        })
      }
    </div>
  );
};

export default Matrix;
