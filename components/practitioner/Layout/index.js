import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { allTemplates, getTemplateLabelById, getTemplateList } from '../../../structures/commons/templates';
import { getTunning, getTunningIdByPattern, getTunningLabelByPattern, getTunningList } from '../../../structures/commons/tunnings';
import { getExerciseList, getExerciseLabel, getExercise } from '../../../structures/practitioner/exercises';
import getMidiIdFromStringAndFret from '../../../utils/getMidiIdFromStringAndFret';
import playMidiNote from '../../../utils/playMidiNote';

import Matrix from '../../commons/Matrix';
import Template from '../../commons/Template';
import Selector from '../../scaletor/Selector';
import SelectorExercises from '../SelectorExercises';
import SelectorPlayback from '../SelectorPlayback';
import SelectorDoubleTemplate from '../../scaletor/SelectorDoubleTemplate';

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

  // Playback Hooks (mantener para UI, pero sin lógica de audio por ahora)
  const defaultBPM = 120;
  const defaultTimeSignature = '4/4';
  const defaultNoteType = 'corchea';
  const [bpm, setBPM] = useState(defaultBPM);
  const [timeSignature, setTimeSignature] = useState(defaultTimeSignature);
  const [noteType, setNoteType] = useState(defaultNoteType);
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
    value: getTunningIdByPattern(defaultTunning, templateStrings) || tunningOptions[0].value,
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
  const [initialNoteType, setInitialNoteType] = useState({
    label: '♪',
    value: defaultNoteType,
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
    if (event.value === null) {
      // Empty input, don't update state
      return;
    }
    setBPM(event.value);
    setInitialBPM({
      label: event.label || event.value.toString(),
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

  const handleNoteTypeChange = (event) => {
    setNoteType(event.value);
    setInitialNoteType({
      label: event.label,
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
    const tunningId = getTunningIdByPattern(tunning, updateTemplateStrings);
    const tunningLabel = getTunningLabelByPattern(tunning, updateTemplateStrings);
    const availableTunnings = getTunningList(updateTemplateStrings);
    
    setInitialTunning({
      label: tunningLabel || (availableTunnings.length > 0 ? availableTunnings[0].label : ''),
      value: tunningId || (availableTunnings.length > 0 ? availableTunnings[0].value : 'standard'),
    });
  }, [template, tunning]);

  useEffect(() => {
    setInitialBPM({
      label: bpm.toString(),
      value: bpm,
    });
  }, [bpm]);

  // Update BPM based on exercise
  useEffect(() => {
    if (exercise) {
      const updateTemplateStrings = allTemplates[template].strings;
      const currentExercise = getExercise(exercise, updateTemplateStrings);
      if (currentExercise) {
        const exerciseBPM = currentExercise.bpm || 120;
        setBPM(exerciseBPM);
      }
    }
  }, [exercise, template]);

  // Playback logic with MIDI sound
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(0);
  const isPlayingRef = useRef(isPlaying);
  const audioContextRef = useRef(null);
  const currentOscillatorRef = useRef(null);
  const currentNotesRef = useRef(null); // Current notes array
  const playbackRunningRef = useRef(false); // Track if playback is actively running
  const previousExerciseRef = useRef(exercise);
  const previousTemplateStringsRef = useRef(templateStrings);

  // Keep ref in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  // Initialize shared AudioContext once
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }
    }

    // Cleanup on unmount
    return () => {
      // Stop current oscillator if playing
      if (currentOscillatorRef.current) {
        try {
          currentOscillatorRef.current.stop();
        } catch (e) {
          // Ignore errors
        }
        currentOscillatorRef.current = null;
      }
      // Don't close audio context - keep it open for reuse
    };
  }, []);

  useEffect(() => {
    const exerciseChanged = previousExerciseRef.current !== exercise;
    const templateChanged = previousTemplateStringsRef.current !== templateStrings;
    
    // Update refs for next comparison
    previousExerciseRef.current = exercise;
    previousTemplateStringsRef.current = templateStrings;

    if (!isPlaying || !exercise) {
      // Clear any active timeouts when paused
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      // Stop current note when paused
      if (currentOscillatorRef.current) {
        try {
          currentOscillatorRef.current.stop();
        } catch (e) {
          // Ignore errors
        }
        currentOscillatorRef.current = null;
      }
      setActiveNotePosition(null);
      playbackRunningRef.current = false;
      
      if (!isPlaying) {
        currentIndexRef.current = 0;
        currentNotesRef.current = null;
      }
      return;
    }

    const currentExercise = getExercise(exercise, templateStrings);
    if (!currentExercise || !currentExercise.figure) {
      return;
    }

    // Get notes array
    const originalNotes = currentExercise.figure;
    
    // Only reset and start playback if:
    // 1. Not already running
    // 2. Exercise or template changed (force restart)
    if (!playbackRunningRef.current || exerciseChanged || templateChanged) {
      currentIndexRef.current = 0;
      currentNotesRef.current = [...originalNotes];
      playbackRunningRef.current = true;
    }

    const beatDurationMs = (60 / bpm) * 1000;
    const timeSigMultiplier = timeSignature === '3/4' ? 0.75 : 1.0;
    
    let noteDurationMs;
    if (noteType === 'negra') {
      noteDurationMs = beatDurationMs * timeSigMultiplier;
    } else if (noteType === 'corchea') {
      noteDurationMs = (beatDurationMs / 2) * timeSigMultiplier;
    } else if (noteType === 'semicorchea') {
      noteDurationMs = (beatDurationMs / 4) * timeSigMultiplier;
    } else {
      noteDurationMs = beatDurationMs * timeSigMultiplier;
    }

    const playNextNote = () => {
      // Check if still playing (in case user paused) - check this first
      if (!isPlayingRef.current || !playbackRunningRef.current) {
        playbackRunningRef.current = false;
        setIsPlaying(false);
        setActiveNotePosition(null);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        return;
      }

      // Check if we've reached the end of current sequence
      if (currentIndexRef.current >= currentNotesRef.current.length) {
        // Stop after one complete cycle
        playbackRunningRef.current = false;
        setIsPlaying(false);
        setActiveNotePosition(null);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        // Reset for next time
        currentNotesRef.current = [...originalNotes];
        return;
      }

      const notes = currentNotesRef.current;

      const note = notes[currentIndexRef.current];
      const stringIndexForMatrix = note.string - 1; // Convert to 0-based index for matrix
      const fretIndexForMatrix = note.fret - 1; // Convert to 0-based index (fret 1 = index 0)
      const positionKey = `${stringIndexForMatrix}-${fretIndexForMatrix}`;
      
      // Set visual position
      setActiveNotePosition(positionKey);

      // Calculate and play MIDI note
      // Get the string tuning from the tunning array
      // Note: string numbers in exercise are 1-based (1-6), array indices are 0-based
      const stringTuning = tunning[stringIndexForMatrix];
      if (stringTuning && audioContextRef.current) {
        // fretIndexForMatrix is already 0-based (fret 1 = index 0)
        const midiId = getMidiIdFromStringAndFret(stringTuning, fretIndexForMatrix);
        if (midiId !== null && midiId !== undefined) {
          // Stop previous note before playing new one (ensure only one note plays at a time)
          if (currentOscillatorRef.current) {
            try {
              currentOscillatorRef.current.stop();
            } catch (e) {
              // Ignore errors when stopping
            }
            currentOscillatorRef.current = null;
          }
          
          // Play the note with duration matching the note type
          // Use shorter duration so notes don't overlap (80% of note duration)
          const noteDuration = noteDurationMs * 0.8;
          const noteResult = playMidiNote(
            midiId, 
            noteDuration, 
            127, 
            audioContextRef.current, 
            currentOscillatorRef
          );
          
          // Store reference to stop if needed
          if (noteResult && noteResult.oscillator) {
            currentOscillatorRef.current = noteResult.oscillator;
          }
        }
      }

      // Move to next note
      currentIndexRef.current += 1;

      // Schedule next note or finish
      timeoutRef.current = setTimeout(() => {
        setActiveNotePosition(null);
        if (isPlayingRef.current && playbackRunningRef.current) {
          playNextNote();
        } else {
          playbackRunningRef.current = false;
          setIsPlaying(false);
          setActiveNotePosition(null);
          currentIndexRef.current = 0;
          timeoutRef.current = null;
        }
      }, noteDurationMs);
    };

    // Only start playing if we're not already in a playback cycle
    // This prevents restarting when useEffect re-runs due to dependency changes
    if (!timeoutRef.current && playbackRunningRef.current) {
      playNextNote();
    }

    // Cleanup function: clear timeout when component unmounts or dependencies change
    // BUT: Don't clear if playback is actively running
    // Capture values in closure for cleanup
    const cleanupExerciseChanged = exerciseChanged;
    const cleanupTemplateChanged = templateChanged;
    const cleanupIsPlaying = isPlaying;
    
    return () => {
      // Only cleanup if we're actually stopping playback or changing exercise/template
      // Do NOT cleanup if playback is running and only other dependencies (bpm, timeSignature, noteType, tunning) changed
      // If playback is running, only cleanup if exercise/template changed or playback stopped
      if (!cleanupIsPlaying || cleanupExerciseChanged || cleanupTemplateChanged) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        // Only set playbackRunningRef to false if playback actually stopped
        if (!cleanupIsPlaying) {
          playbackRunningRef.current = false;
        }
      }
    };
  }, [isPlaying, exercise, templateStrings, bpm, timeSignature, noteType, tunning]);

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
        <SelectorPlayback
          id="playback"
          title="Playback"
          onChangeBPM={handleBPMChange}
          onChangeTimeSignature={handleTimeSignatureChange}
          onChangeNoteType={handleNoteTypeChange}
          onChangePlayPause={handlePlayPauseChange}
          valueBPM={initialBPM}
          valueTimeSignature={initialTimeSignature}
          valueNoteType={initialNoteType}
          isPlaying={isPlaying}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
};

export default Layout;
