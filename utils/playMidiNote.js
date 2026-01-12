/**
 * Plays a MIDI note using Web Audio API
 * 
 * @param {Number} midiNote - The MIDI note number (0-127)
 * @param {Number} duration - The duration in milliseconds (default: 500ms)
 * @param {Number} velocity - The velocity/volume (0-127, default: 127)
 */
const playMidiNote = (midiNote, duration = 500, velocity = 127) => {
  // Check if Web Audio API is available
  if (typeof window === 'undefined' || !window.AudioContext && !window.webkitAudioContext) {
    console.warn('Web Audio API is not available');
    return;
  }

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

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

    // Clean up after the note finishes
    oscillator.onended = () => {
      audioContext.close().catch(() => {
        // Ignore errors when closing audio context
      });
    };
  } catch (error) {
    console.error('Error playing MIDI note:', error);
  }
};

export default playMidiNote;
