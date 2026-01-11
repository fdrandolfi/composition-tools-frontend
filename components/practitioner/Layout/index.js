import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { allTemplates, getTemplateLabelById, getTemplateList } from '../../../structures/commons/templates';
import { getTunning, getTunningIdByPattern, getTunningLabelByPattern, getTunningList } from '../../../structures/commons/tunnings';
import { getExerciseList, getExerciseLabel } from '../../../structures/practitioner/exercises';

import Matrix from '../../commons/Matrix';
import Template from '../../commons/Template';
import Selector from '../../scaletor/Selector';
import SelectorExercises from '../SelectorExercises';
import SelectorDoubleTemplate from '../../scaletor/SelectorDoubleTemplate';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { query } = router;

  // Lists
  const templateGuitarsList = getTemplateList('guitars');
  const templateBassesList = getTemplateList('basses');
  const templateMIDIList = getTemplateList('midi_controllers');
  const exerciseList = getExerciseList();

  // Template Hooks
  const defaultTemplate = templateGuitarsList[0].value;
  const [template, setTemplate] = useState(defaultTemplate);

  // Initial Tunning
  const templateStrings = allTemplates[template].strings;
  const tunningOptions = getTunningList(templateStrings);
  const defaultTunning = getTunning(tunningOptions[0].value, templateStrings);
  const [tunning, setTunning] = useState(defaultTunning);

  // Exercise Hooks
  const defaultBPM = 120;
  const defaultExercise = exerciseList.length > 0 ? exerciseList[0].value : null;
  const [bpm, setBPM] = useState(defaultBPM);
  const [exercise, setExercise] = useState(defaultExercise);

  // Switch Hooks
  const defaultExerciseSwitch = true;
  const [exerciseSwitch, setExerciseSwitch] = useState(defaultExerciseSwitch);
  const defaultTemplateSwitch = false;
  const [templateSwitch, setTemplateSwitch] = useState(defaultTemplateSwitch);

  // Initial values from QueryParams
  const [initialTemplate, setInitialTemplate] = useState(templateGuitarsList[0]);
  const [initialTunning, setInitialTunning] = useState({
    label: getTunningLabelByPattern(defaultTunning, templateStrings),
    value: defaultTunning,
  });
  const [initialBPM, setInitialBPM] = useState({
    label: defaultBPM.toString(),
    value: defaultBPM,
  });
  const [initialExercise, setInitialExercise] = useState(exerciseList.length > 0 ? exerciseList[0] : null);

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

  const handleBPMChange = (event) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        bpm: event.value
      },
    }, undefined, { shallow: true });
    setBPM(event.value);
  };

  const handleExerciseChange = (event) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        exercise: event.value
      },
    }, undefined, { shallow: true });
    setExercise(event.value);
  };

  const handleExerciseSwitchChange = (check) => {
    setExerciseSwitch(check);
  };

  const handleTemplateSwitchChange = (check) => {
    setTemplateSwitch(check);
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

    if (query.bpm) setBPM(Number(query.bpm));

    if (query.exercise) setExercise(query.exercise);
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
    setInitialBPM({
      label: bpm.toString(),
      value: bpm,
    });
  }, [bpm]);

  useEffect(() => {
    if (exercise) {
      setInitialExercise({
        label: getExerciseLabel(exercise),
        value: exercise,
      });
    }
  }, [exercise]);

  // Resize
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

  /**
   * Return
   */
  return (
    <section className="layout-practitioner">
      <div className="layout-practitioner__top">
        <div className={classNames(
          'layout-practitioner__column-3',
          tunningOptions.length <= 1 && 'layout-practitioner__with-opacity',
        )}
        >
          <Selector
            id="tunning"
            title="Tunning"
            options={tunningOptions}
            onChange={handleTunningChange}
            value={initialTunning}
            isMobile={isMobile}
          />
        </div>
        <div className="layout-practitioner__column-3">
          <SelectorExercises
            id="exercise"
            title="Exercises"
            optionsExercises={exerciseList}
            onChangeBPM={handleBPMChange}
            onChangeExercise={handleExerciseChange}
            onChangeExerciseSwitch={handleExerciseSwitchChange}
            checkedExerciseSwitch={exerciseSwitch}
            valueBPM={initialBPM}
            valueExercise={initialExercise}
            isMobile={isMobile}
          />
        </div>
        <div className="layout-practitioner__column-3">
          <SelectorDoubleTemplate
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
            onChangeTemplateSwitch={handleTemplateSwitchChange}
            checkedTemplateSwitch={templateSwitch}
            value={initialTemplate}
            isMobile={isMobile}
          />
        </div>
      </div>
      <div className="layout-practitioner__center">
        <Matrix
          templateId={template}
          tunning={tunning}
          scale={{
            noteId: 1,
            scaleId: 'without',
          }}
          withoutScale={!exerciseSwitch}
          templateMode={templateSwitch}
        />
        <Template
          id={template} 
          templateMode={templateSwitch}
        />
      </div>
    </section>
  );
};

export default Layout;
