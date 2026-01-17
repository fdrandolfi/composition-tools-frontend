import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import { allTemplates, getTemplateLabelById, getTemplateList } from '../../../structures/commons/templates';
import { getTunning, getTunningIdByPattern, getTunningLabelByPattern, getTunningList } from '../../../structures/commons/tunnings';
import { getExerciseList, getExerciseLabel, getExercise, getTunningListForExercises, extractTunningIdFromExercise, hasExercisesForStrings } from '../../../structures/practitioner/exercises';
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

  // Lists - Filter templates to only show those with exercises available
  const allTemplateGuitarsList = getTemplateList('guitars');
  const allTemplateBassesList = getTemplateList('basses');
  const allTemplateMIDIList = getTemplateList('midi_controllers');
  
  // Filter templates that have exercises for their string count
  const templateGuitarsList = allTemplateGuitarsList.filter(template => {
    const templateStrings = allTemplates[template.value].strings;
    return hasExercisesForStrings(templateStrings);
  });
  
  const templateBassesList = allTemplateBassesList.filter(template => {
    const templateStrings = allTemplates[template.value].strings;
    return hasExercisesForStrings(templateStrings);
  });
  
  const templateMIDIList = allTemplateMIDIList.filter(template => {
    const templateStrings = allTemplates[template.value].strings;
    return hasExercisesForStrings(templateStrings);
  });

  // Template Hooks - Use first available template with exercises
  const defaultTemplate = templateGuitarsList.length > 0 
    ? templateGuitarsList[0].value 
    : (templateBassesList.length > 0 
      ? templateBassesList[0].value 
      : (templateMIDIList.length > 0 ? templateMIDIList[0].value : null));
  const [template, setTemplate] = useState(defaultTemplate);

  // Initial Tunning
  const templateStrings = template && allTemplates[template] ? allTemplates[template].strings : 6;
  // Get all available tunnings
  const allTunningOptions = getTunningList(templateStrings);
  // Get tunnings that have exercises assigned
  const tunningIdsForExercises = getTunningListForExercises(templateStrings);
  // Filter tunning options to only show those with exercises
  const tunningOptions = allTunningOptions.filter(option => 
    tunningIdsForExercises.includes(option.value)
  );
  // If no tunnings with exercises, use all tunnings (fallback)
  const availableTunningOptions = tunningOptions.length > 0 ? tunningOptions : allTunningOptions;
  // Disable tunning selector when exercises have specific tunning
  // The tunning will be assigned automatically based on the selected exercise
  // User should not be able to manually change it when exercises have specific tunning
  const isTunningDisabled = tunningIdsForExercises.length > 0;
  const defaultTunning = availableTunningOptions.length > 0 
    ? getTunning(availableTunningOptions[0].value, templateStrings)
    : null;
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
  const defaultNoteType = 'negra';
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
  const [initialTemplate, setInitialTemplate] = useState(
    templateGuitarsList.length > 0 
      ? templateGuitarsList[0] 
      : (templateBassesList.length > 0 
        ? templateBassesList[0] 
        : (templateMIDIList.length > 0 ? templateMIDIList[0] : null))
  );
  const [initialTunning, setInitialTunning] = useState({
    label: getTunningLabelByPattern(defaultTunning, templateStrings),
    value: getTunningIdByPattern(defaultTunning, templateStrings) || availableTunningOptions[0].value,
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
    // Remove exercise from query to reset exercises when template changes
    const newQuery = { ...query };
    delete newQuery.exercise;
    
    router.replace({
      pathname: router.pathname,
      query: {
        ...newQuery,
        template: event.value,
        tunning: 'standard',
      },
    }, undefined, { shallow: true });
    setTemplate(event.value);
    // Reset exercise state
    setExercise(null);
    setInitialExercise(null);
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
    const updateTemplateStrings = allTemplates[template].strings;
    const selectedExercise = getExercise(event.value, updateTemplateStrings);
    
    // Get available tunning options (filtered by exercises)
    const tunningIdsForExercises = getTunningListForExercises(updateTemplateStrings);
    const allTunnings = getTunningList(updateTemplateStrings);
    const filteredTunnings = allTunnings.filter(option => 
      tunningIdsForExercises.includes(option.value)
    );
    const availableTunnings = filteredTunnings.length > 0 ? filteredTunnings : allTunnings;
    
    // Determine which tunning to use
    let tunningToUse = availableTunnings[0].value; // Default tunning (first available)
    
    if (selectedExercise && selectedExercise.tunning !== null && selectedExercise.tunning !== undefined) {
      // Extract tunning id from exercise tunning value (e.g., "standard_6" -> "standard")
      const exerciseTunningId = extractTunningIdFromExercise(selectedExercise.tunning, updateTemplateStrings);
      if (exerciseTunningId) {
        // Verify that the tunning exists in the available tunnings
        const tunningExists = allTunnings.some(option => option.value === exerciseTunningId);
        if (tunningExists) {
          tunningToUse = exerciseTunningId;
        }
      }
    }
    // If exercise has tunning: null or tunning doesn't exist, use default tunning (already set above)
    
    // Update tunning state
    const updatedTunning = getTunning(tunningToUse, updateTemplateStrings);
    setTunning(updatedTunning);
    
    router.push({
      pathname: router.pathname,
      query: {
        ...query,
        exercise: event.value,
        tunning: tunningToUse,
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
    // Stop playback if playing
    if (isPlaying) {
      setIsPlaying(false);
    }
    setBPM(event.value);
    setInitialBPM({
      label: event.label || event.value.toString(),
      value: event.value,
    });
  };

  const handleTimeSignatureChange = (event) => {
    // Stop playback if playing
    if (isPlaying) {
      setIsPlaying(false);
    }
    setTimeSignature(event.value);
    setInitialTimeSignature({
      label: event.value,
      value: event.value,
    });
  };

  const handleNoteTypeChange = (event) => {
    // Stop playback if playing
    if (isPlaying) {
      setIsPlaying(false);
    }
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

    // Handle exercise from query params
    // If exercise is not in query, reset it (e.g., when template changes)
    if (query.exercise) {
      setExercise(query.exercise);
    } else {
      // Reset exercise when it's removed from query (e.g., template change)
      setExercise(null);
      setInitialExercise(null);
    }
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
    // Get filtered tunnings for exercises
    const tunningIdsForExercises = getTunningListForExercises(updateTemplateStrings);
    const allTunnings = getTunningList(updateTemplateStrings);
    const availableTunnings = allTunnings.filter(option => 
      tunningIdsForExercises.includes(option.value)
    );
    // If no tunnings with exercises, use all tunnings (fallback)
    const finalTunnings = availableTunnings.length > 0 ? availableTunnings : allTunnings;
    
    setInitialTunning({
      label: tunningLabel || (finalTunnings.length > 0 ? finalTunnings[0].label : ''),
      value: tunningId || (finalTunnings.length > 0 ? finalTunnings[0].value : 'standard'),
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
    let timeSigMultiplier = 1.0;
    if (timeSignature === '3/4') {
      timeSigMultiplier = 0.75;
    } else if (timeSignature === '5/4') {
      timeSigMultiplier = 1.25;
    }
    
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
    // Only reset if exercise is not in query (i.e., was removed by handleTemplateChange)
    if (!query.exercise) {
      const updateTemplateStrings = allTemplates[template].strings;
      const updatedExerciseList = getExerciseList(updateTemplateStrings);
      if (updatedExerciseList.length > 0 && updatedExerciseList[0].options.length > 0) {
        const firstExercise = updatedExerciseList[0].options[0].value;
        setExercise(firstExercise);
        setInitialExercise(updatedExerciseList[0].options[0]);
        
        // Set default tunning when template changes
        const selectedExercise = getExercise(firstExercise, updateTemplateStrings);
        const tunningIdsForExercises = getTunningListForExercises(updateTemplateStrings);
        const allTunnings = getTunningList(updateTemplateStrings);
        const filteredTunnings = allTunnings.filter(option => 
          tunningIdsForExercises.includes(option.value)
        );
        const availableTunnings = filteredTunnings.length > 0 ? filteredTunnings : allTunnings;
        
        let tunningToUse = availableTunnings[0].value; // Default tunning (first available)
        
        if (selectedExercise && selectedExercise.tunning !== null && selectedExercise.tunning !== undefined) {
          // Extract tunning id from exercise tunning value
          const exerciseTunningId = extractTunningIdFromExercise(selectedExercise.tunning, updateTemplateStrings);
          if (exerciseTunningId) {
            // Verify that the tunning exists in the available tunnings
            const tunningExists = allTunnings.some(option => option.value === exerciseTunningId);
            if (tunningExists) {
              tunningToUse = exerciseTunningId;
            }
          }
        }
        // If exercise has tunning: null or tunning doesn't exist, use default tunning (already set above)
        
        const updatedTunning = getTunning(tunningToUse, updateTemplateStrings);
        setTunning(updatedTunning);
      } else {
        setExercise(null);
        setInitialExercise(null);
      }
    }
  }, [template, query.exercise]);

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
          availableTunningOptions.length <= 1 && 'layout-practitioner__with-opacity',
        )}
        >
          <Selector
            id="tunning"
            title="Tunning"
            options={availableTunningOptions}
            onChange={handleTunningChange}
            value={initialTunning}
            isMobile={isMobile}
            isDisabled={isTunningDisabled}
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
              ...(templateGuitarsList.length > 0 ? [{
                label: 'Guitars',
                options: templateGuitarsList,
              }] : []),
              ...(templateBassesList.length > 0 ? [{
                label: 'Basses',
                options: templateBassesList,
              }] : []),
              ...(templateMIDIList.length > 0 ? [{
                label: 'MIDI Controllers',
                options: templateMIDIList,
              }] : []),
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
