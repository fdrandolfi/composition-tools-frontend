import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import { getFifthById } from '../../../structures/quintor/fifths';
import { getNoteList } from '../../../structures/quintor/notes';

import FifthSelector from '../FifthSelector';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  const tonalityAndModeById = {
    1: {
      type: 'Tonic',
      mode: 'I',
    },
    2: {
      type: 'Super Tonic',
      mode: 'ii',
    },
    3: {
      type: 'Mediant',
      mode: 'iii',
    },
    4: {
      type: 'Subdominant',
      mode: 'IV',
    },
    5: {
      type: 'Dominant',
      mode: 'V',
    },
    6: {
      type: 'Submediant',
      mode: 'vi',
    },
    7: {
      type: 'Leading Tone',
      mode: 'vii°',
    },
  };

  const notesOptions = getNoteList();
  const defaultFifth = getFifthById(notesOptions[0].value - 1);
  const [fifthData, setFitfhData] = useState(defaultFifth);

  const handleNotesChange = (event) => {
    setFitfhData(getFifthById(event.value - 1));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024);
      };

      handleResize(); // Set the initial value

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <section className="layout-quintor">
      <div className="layout-quintor__center">
        <FifthSelector
          id="fifth-notes"
          title="Fifth Note"
          options={notesOptions}
          onChange={handleNotesChange}
          defaultValue={notesOptions[0]}
          isMobile={isMobile}
        />
        <div className="fifth-matrix">
          {
            fifthData.context.map((note) => (
              <div
                key={`matrix-${note.id}`}
                className={classNames(
                  'fifth-matrix__note',
                  `fifth-matrix__note-${note.id}`,
                )}
              >
                <span className="fifth-matrix__note-type">
                  {tonalityAndModeById[note.id].type}
                </span>
                <span className="fifth-matrix__note-name">
                  {note.name}
                </span>
                <span className="fifth-matrix__note-mode">
                  {tonalityAndModeById[note.id].mode}
                </span>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Layout;
