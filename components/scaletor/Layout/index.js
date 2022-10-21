import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { allTemplates, getTemplateList } from '../../../structures/client/pages/scaletor/templates';
import { getTunning, getTunningList } from '../../../structures/client/pages/scaletor/tunnings';
import { getNoteList } from '../../../structures/client/pages/scaletor/notes';
import { getScaleList, getScaleModesList } from '../../../structures/client/pages/scaletor/scales';

import Matrix from '../Matrix';
import Template from '../Template';
import Selector from '../Selector';
import SelectorDouble from '../SelectorDouble';
import NotesHistory from '../NotesHistory';

const Layout = () => {
  // Lists
  const noteList = getNoteList();
  const scaleList = getScaleList();
  const scaleModesList = getScaleModesList();
  const templateGuitarsList = getTemplateList('guitars');
  const templateBassesList = getTemplateList('basses');
  const templateMIDIList = getTemplateList('midi_controllers');
  const withoutScale = 'without';

  // Scale & Note Hooks
  const defaultNote = noteList[0].value;
  const defaultScale = scaleList[0].value;
  const [note, setNote] = useState(defaultNote);
  const [scale, setScale] = useState(defaultScale);

  const [lastScale, setLastScale] = useState();
  const [lastNote, setLastNote] = useState();

  // Switch Hooks
  const defaultScaleSwitch = true;
  const [scaleSwitch, setScaleSwitch] = useState(defaultScaleSwitch);

  // Template Hooks
  const defaultTemplate = templateGuitarsList[0].value;
  const [template, setTemplate] = useState(defaultTemplate);

  // Initial Tunning
  const templateStrings = allTemplates[template].strings;
  const tunningOptions = getTunningList(templateStrings);
  const defaultTunning = getTunning(tunningOptions[0].value, templateStrings);
  const [tunning, setTunning] = useState(defaultTunning);

  useEffect(() => {
    // Update Tunning by Template
    const updateTemplateStrings = allTemplates[template].strings;
    const updateTunningOptions = getTunningList(updateTemplateStrings);
    const updatedTunning = getTunning(updateTunningOptions[0].value, updateTemplateStrings);
    setTunning(updatedTunning);
  }, [template]);

  // Handles
  const handleNoteChange = (event) => {
    setNote(event.value);
  };

  const handleScaleChange = (event) => {
    setScale(event.value);
  };

  const handleSwitchChange = (check) => {
    setScaleSwitch(check);
    setLastScale(scale);
    setLastNote(note);
    if (!check) {
      setScale(withoutScale);
    } else {
      setScale(lastScale);
      setNote(lastNote);
    }
  };

  const handleTemplateChange = (event) => {
    setTemplate(event.value);
  };

  const handleTunningChange = (event) => {
    setTunning(getTunning(event.value, templateStrings));
  };

  // Return
  return (
    <section className="layout">
      <div className="layout__top">
        <div className={classNames(
          'layout__column-3',
          tunningOptions.length <= 1 && 'layout__with-opacity',
        )}
        >
          <Selector
            id="tunning"
            title="Tunning"
            options={tunningOptions}
            onChange={handleTunningChange}
            defaultValue={tunningOptions[0]}
          />
        </div>
        <div className="layout__column-3">
          <SelectorDouble
            id="scale"
            title="Scales"
            optionsNote={noteList}
            optionsScale={scaleList}
            optionsScaleModes={scaleModesList}
            onChangeNote={handleNoteChange}
            onChangeScale={handleScaleChange}
            onChangeScaleSwitch={handleSwitchChange}
            checkedScaleSwitch={scaleSwitch}
          />
        </div>
        <div className="layout__column-3">
          <Selector
            id="template"
            title="Template"
            options={[
              {
                label: 'Guitars',
                options: templateGuitarsList,
              },
              {
                label: 'Basses',
                options: templateBassesList,
              },
              {
                label: 'MIDI Controllers',
                options: templateMIDIList,
              },
            ]}
            onChange={handleTemplateChange}
            defaultValue={templateGuitarsList[0]}
          />
        </div>
      </div>
      <div className="layout__bottom">
        <div className="layout__column-3">
          <NotesHistory />
        </div>
        <div className="layout__column-3" />
        <div className="layout__column-3" />
      </div>
      <div className="layout__center">
        <Matrix
          templateId={template}
          tunning={tunning}
          scale={{
            noteId: note,
            scaleId: scale,
          }}
          withoutScale={!scaleSwitch}
        />
        <Template id={template} />
      </div>
    </section>
  );
};

export default Layout;
