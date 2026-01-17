/**
 * Plays a MIDI note using Web Audio API
 * 
 * @param {Number} midiNote - The MIDI note number (0-127)
 * @param {Number} duration - The duration in milliseconds (default: 500ms)
 * @param {Number} velocity - The velocity/volume (0-127, default: 127)
 * @param {AudioContext} sharedAudioContext - Optional shared AudioContext (for playback sequences)
 * @param {Object} previousNoteRef - Optional ref to stop previous note before playing new one
 * @returns {Object} Object with stop function to stop the note early
 */
const playMidiNote = (midiNote, duration = 500, velocity = 127, sharedAudioContext = null, previousNoteRef = null) => {
  // Check if Web Audio API is available
  if (typeof window === 'undefined' || !window.AudioContext && !window.webkitAudioContext) {
    console.warn('Web Audio API is not available');
    return null;
  }

  try {
    // Stop previous note if exists (for playback sequences)
    if (previousNoteRef && previousNoteRef.current) {
      try {
        previousNoteRef.current.stop();
      } catch (e) {
        // Ignore errors when stopping previous note
      }
      previousNoteRef.current = null;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = sharedAudioContext || new AudioContext();

    // Calculate frequency from MIDI note number
    // Formula: frequency = 440 * 2^((midiNote - 69) / 12)
    const frequency = 440 * Math.pow(2, (midiNote - 69) / 12);

    // Create oscillator
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Set oscillator type to sine wave for a clean tone
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;

    // Set volume (convert velocity 0-127 to gain 0-1)
    const gainValue = velocity / 127;
    gainNode.gain.setValueAtTime(gainValue, audioContext.currentTime);

    // Envelope: attack, sustain, release
    const now = audioContext.currentTime;
    const attackTime = 0.01; // 10ms attack
    const releaseTime = 0.1; // 100ms release
    const durationSeconds = duration / 1000;

    // Attack
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(gainValue, now + attackTime);

    // Release
    gainNode.gain.setValueAtTime(gainValue, now + durationSeconds - releaseTime);
    gainNode.gain.linearRampToValueAtTime(0, now + durationSeconds);

    // Start and stop oscillator
    oscillator.start(now);
    oscillator.stop(now + durationSeconds);

    // Store reference for stopping if provided
    if (previousNoteRef) {
      previousNoteRef.current = oscillator;
    }

    // Clean up after the note finishes (only if not using shared context)
    if (!sharedAudioContext) {
      oscillator.onended = () => {
        audioContext.close().catch(() => {
          // Ignore errors when closing audio context
        });
      };
    }

    // Return object with stop function
    return {
      stop: () => {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch (e) {
          // Ignore errors
        }
      },
      oscillator,
    };
  } catch (error) {
    console.error('Error playing MIDI note:', error);
    return null;
  }
};

export default playMidiNote;
