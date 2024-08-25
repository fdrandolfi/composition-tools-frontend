import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { allTemplates, getTemplateLabelById, getTemplateList } from '../../../structures/scaletor/templates';
import { getTunning, getTunningIdByPattern, getTunningLabelByPattern, getTunningList } from '../../../structures/scaletor/tunnings';
import { getLabelByNote, getNoteList } from '../../../structures/scaletor/notes';
import { getScaleLabel, getScaleList, getScaleModesList } from '../../../structures/scaletor/scales';

import Matrix from '../Matrix';
import Template from '../Template';
import Selector from '../Selector';
import SelectorDouble from '../SelectorDouble';
import NotesHistory from '../NotesHistory';

const Layout = () => {
  const router = useRouter();
  const { query } = router;

  // Lists
  const templateGuitarsList = getTemplateList('guitars');
  const templateBassesList = getTemplateList('basses');
  const templateMIDIList = getTemplateList('midi_controllers');
  const noteList = getNoteList();
  const scaleList = getScaleList();
  const scaleModesList = getScaleModesList();
  const withoutScale = 'without';

  // Template Hooks
  const defaultTemplate = templateGuitarsList[0].value;
  const [template, setTemplate] = useState(defaultTemplate);

  // Initial Tunning
  const templateStrings = allTemplates[template].strings;
  const tunningOptions = getTunningList(templateStrings);
  const defaultTunning = getTunning(tunningOptions[0].value, templateStrings);
  const [tunning, setTunning] = useState(defaultTunning);

  // Note & scale Hooks
  const defaultNote = noteList[0].value;
  const defaultScale = scaleList[0].value;
  const [note, setNote] = useState(defaultNote);
  const [scale, setScale] = useState(defaultScale);
  const [lastNote, setLastNote] = useState();
  const [lastScale, setLastScale] = useState();

  // Switch Hooks
  const defaultScaleSwitch = true;
  const [scaleSwitch, setScaleSwitch] = useState(defaultScaleSwitch);

  // Initial values from QueryParams
  const [initialTemplate, setInitialTemplate] = useState(templateGuitarsList[0]);
  const [initialTunning, setInitialTunning] = useState({
    label: getTunningLabelByPattern(defaultTunning, templateStrings),
    value: defaultTunning,
  });
  const [initialScaleNote, setInitialScaleNote] = useState(noteList[0]);
  const [initialScaleName, setInitialScaleName] = useState(scaleList[0]);

  /**
   * Handle Value Changes
   */
  const handleTemplateChange = (event) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...query,
        template: event.value,
        tunning: 'standard',
      },
    }, undefined, { shallow: true });
    setTemplate(event.value);
  };

  const handleTunningChange = (event) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...query,
        template,
        tunning: event.value
      },
    }, undefined, { shallow: true });
    const updateTemplateStrings = allTemplates[template].strings;
    const updatedTunning = getTunning(event.value, updateTemplateStrings);
    setTunning(updatedTunning);
  };

  const handleNoteChange = (event) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        scale_note: event.value
      },
    }, undefined, { shallow: true });
    setNote(event.value);
  };

  const handleScaleChange = (event) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        scale_name: event.value
      },
    }, undefined, { shallow: true });
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

  /**
   * Update Values by Query Params
   */
  useEffect(() => {
    if (query.template) setTemplate(query.template);

    if (query.tunning) {
      if (query.template) {
        const updateTemplateStrings = allTemplates[query.template].strings;
        const updatedTunning = getTunning(query.tunning, updateTemplateStrings);
        setTunning(updatedTunning);
      } else {
        const updateTemplateStrings = allTemplates[template].strings;
        const updatedTunning = getTunning(query.tunning, updateTemplateStrings);
        setTunning(updatedTunning);
      }
    }

    if (query.scale_note) setNote(Number(query.scale_note));

    if (query.scale_name) setScale(query.scale_name);
  }, [query]);

  /**
   * Update Select Values by Query Params
  */
  useEffect(() => {
    setInitialTemplate({
      label: getTemplateLabelById(template),
      value: template,
    });
  }, [template]);

  useEffect(() => {
    const updateTemplateStrings = allTemplates[template].strings;
    setInitialTunning({
      label: getTunningLabelByPattern(tunning, updateTemplateStrings),
      value: getTunningIdByPattern(tunning, updateTemplateStrings),
    });
  }, [template, tunning]);

  useEffect(() => {
    setInitialScaleNote({
      label: getLabelByNote(note),
      value: note,
    });
  }, [note]);

  useEffect(() => {
    setInitialScaleName({
      label: getScaleLabel(scale),
      value: scale,
    });
  }, [scale]);

  /**
   * Return
   */
  return (
    <section className="layout-scaletor">
      <div className="layout-scaletor__top">
        <div className={classNames(
          'layout-scaletor__column-3',
          tunningOptions.length <= 1 && 'layout-scaletor__with-opacity',
        )}
        >
          <Selector
            id="tunning"
            title="Tunning"
            options={tunningOptions}
            onChange={handleTunningChange}
            value={initialTunning}
          />
        </div>
        <div className="layout-scaletor__column-3">
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
            valueNote={initialScaleNote}
            valueScale={initialScaleName}
          />
        </div>
        <div className="layout-scaletor__column-3">
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
            value={initialTemplate}
          />
        </div>
      </div>
      <div className="layout-scaletor__bottom">
        <div className="layout-scaletor__column-3">
          <NotesHistory />
        </div>
        <div className="layout-scaletor__column-3" />
        <div className="layout-scaletor__column-3" />
      </div>
      <div className="layout-scaletor__center">
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
