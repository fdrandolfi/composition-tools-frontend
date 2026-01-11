import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { allTemplates, getTemplateLabelById, getTemplateList } from '../../../structures/commons/templates';
import { getTunning, getTunningIdByPattern, getTunningLabelByPattern, getTunningList } from '../../../structures/commons/tunnings';
import { getExerciseList, getExerciseLabel, getExercise } from '../../../structures/practitioner/exercises';

import * as Tone from 'tone';

import Matrix from '../../commons/Matrix';
import Template from '../../commons/Template';
import Selector from '../../scaletor/Selector';
import SelectorExercises from '../SelectorExercises';
import SelectorPlayback from '../SelectorPlayback';
import SelectorDoubleTemplate from '../../scaletor/SelectorDoubleTemplate';
import { getMIDINoteFromPosition } from '../../../structures/practitioner/utils/getMIDINote';

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const { query } = router;

  // Lists
  const templateGuitarsList = getTemplateList('guitars');
  const templateBassesList = getTemplateList('basses');
  const templateMIDIList = getTemplateList('midi_controllers');

  // Template Hooks
  const defaultTemplate = templateGuitarsList[0].value;
  const [template, setTemplate] = useState(defaultTemplate);

  // Initial Tunning
  const templateStrings = allTemplates[template].strings;
  const tunningOptions = getTunningList(templateStrings);
  const defaultTunning = getTunning(tunningOptions[0].value, templateStrings);
  const [tunning, setTunning] = useState(defaultTunning);

  // Exercise Hooks - Get exercise list based on template strings
  const exerciseList = getExerciseList(templateStrings);
  const defaultExercise = exerciseList.length > 0 && exerciseList[0].options.length > 0 
    ? exerciseList[0].options[0].value 
    : null;
  const [exercise, setExercise] = useState(defaultExercise);

  // Playback Hooks
  const defaultBPM = 120;
  const defaultTimeSignature = '4/4';
  const [bpm, setBPM] = useState(defaultBPM);
  const [timeSignature, setTimeSignature] = useState(defaultTimeSignature);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNotePosition, setActiveNotePosition] = useState(null);

  // Switch Hooks
  const defaultExerciseSwitch = false;
  const [exerciseSwitch, setExerciseSwitch] = useState(defaultExerciseSwitch);
  const defaultTemplateSwitch = false;
  const [templateSwitch, setTemplateSwitch] = useState(defaultTemplateSwitch);

  // Initial values from QueryParams
  const [initialTemplate, setInitialTemplate] = useState(templateGuitarsList[0]);
  const [initialTunning, setInitialTunning] = useState({
    label: getTunningLabelByPattern(defaultTunning, templateStrings),
    value: defaultTunning,
  });
  const [initialExercise, setInitialExercise] = useState(
    exerciseList.length > 0 && exerciseList[0].options.length > 0 
      ? exerciseList[0].options[0] 
      : null
  );
  const [initialBPM, setInitialBPM] = useState({
    label: defaultBPM.toString(),
    value: defaultBPM,
  });
  const [initialTimeSignature, setInitialTimeSignature] = useState({
    label: defaultTimeSignature,
    value: defaultTimeSignature,
  });

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

  const handleBPMChange = (event) => {
    setBPM(event.value);
    setInitialBPM({
      label: event.value.toString(),
      value: event.value,
    });
  };

  const handleTimeSignatureChange = (event) => {
    setTimeSignature(event.value);
    setInitialTimeSignature({
      label: event.value,
      value: event.value,
    });
  };

  const handlePlayPauseChange = () => {
    setIsPlaying(!isPlaying);
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

  // Playback logic
  useEffect(() => {
    if (!isPlaying || !exercise) {
      setActiveNotePosition(null);
      return;
    }

    const currentExercise = getExercise(exercise, templateStrings);
    if (!currentExercise || !currentExercise.figure) {
      return;
    }

    let synth = null;
    let timeouts = [];

    // Initialize Tone.js and start audio context
    const startPlayback = async () => {
      await Tone.start();
      synth = new Tone.Synth().toDestination();
      
      // Calculate note duration in milliseconds
      // At 100 BPM, each quarter note = 600ms (60,000ms / 100 BPM)
      const noteDurationMs = (60 / bpm) * 1000;
      
      let currentIndex = 0;
      const notes = currentExercise.figure;

      const playNextNote = () => {
        if (currentIndex >= notes.length) {
          setIsPlaying(false);
          setActiveNotePosition(null);
          if (synth) {
            synth.dispose();
            synth = null;
          }
          return;
        }

        const note = notes[currentIndex];
        // Convert string (1-6, where 1=high, 6=low) to array index (0-5, where 0=low, 5=high)
        // tunning array: index 0 = string 6 (low), index 5 = string 1 (high)
        const stringIndex = 6 - note.string; // string 6 -> index 0, string 1 -> index 5
        const stringTuning = tunning[stringIndex];
        
        const midiNote = getMIDINoteFromPosition(stringTuning, note.fret);
        if (midiNote !== null && synth) {
          // Convert MIDI note to frequency
          const frequency = Tone.Frequency(midiNote, 'midi').toFrequency();
          synth.triggerAttackRelease(frequency, noteDurationMs / 1000);
        }

        // Set active position for Matrix visualization
        const positionKey = `${stringIndex}-${note.fret - 1}`;
        setActiveNotePosition(positionKey);

        currentIndex += 1;

        // Schedule next note
        const timeoutId = setTimeout(() => {
          setActiveNotePosition(null);
          if (currentIndex < notes.length) {
            playNextNote();
          } else {
            setIsPlaying(false);
            setActiveNotePosition(null);
            if (synth) {
              synth.dispose();
              synth = null;
            }
          }
        }, noteDurationMs);
        
        timeouts.push(timeoutId);
      };

      // Start playback
      playNextNote();
    };

    startPlayback();

    // Cleanup function
    return () => {
      timeouts.forEach(clearTimeout);
      if (synth) {
        synth.dispose();
        synth = null;
      }
      setActiveNotePosition(null);
    };
  }, [isPlaying, exercise, templateStrings, tunning, bpm, timeSignature]);

  useEffect(() => {
    // Update exercise list when template changes
    const updateTemplateStrings = allTemplates[template].strings;
    const updatedExerciseList = getExerciseList(updateTemplateStrings);
    if (updatedExerciseList.length > 0 && updatedExerciseList[0].options.length > 0) {
      const firstExercise = updatedExerciseList[0].options[0].value;
      setExercise(firstExercise);
      setInitialExercise(updatedExerciseList[0].options[0]);
    } else {
      setExercise(null);
      setInitialExercise(null);
    }
  }, [template]);

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
            optionsExercises={getExerciseList(templateStrings)}
            onChangeExercise={handleExerciseChange}
            onChangeExerciseSwitch={handleExerciseSwitchChange}
            checkedExerciseSwitch={exerciseSwitch}
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
            switchColor="#960A00"
          />
        </div>
      </div>
      <div className="layout-practitioner__center">
        <Matrix
          templateId={template}
          tunning={tunning}
          scale={null}
          withoutScale={!exerciseSwitch}
          templateMode={templateSwitch}
          exercise={exercise ? getExercise(exercise, templateStrings) : null}
          exerciseSwitch={exerciseSwitch}
          activeNotePosition={activeNotePosition}
        />
        <Template
          id={template} 
          templateMode={templateSwitch}
        />
      </div>
      <div className="layout-practitioner__bottom">
        <div className="layout-practitioner__column-3" />
        <div className="layout-practitioner__column-3">
          <SelectorPlayback
            id="playback"
            title="Playback"
            onChangeBPM={handleBPMChange}
            onChangeTimeSignature={handleTimeSignatureChange}
            onChangePlayPause={handlePlayPauseChange}
            valueBPM={initialBPM}
            valueTimeSignature={initialTimeSignature}
            isPlaying={isPlaying}
            isMobile={isMobile}
          />
        </div>
        <div className="layout-practitioner__column-3" />
      </div>
    </section>
  );
};

export default Layout;
