import React from 'react';
import classnames from 'classnames';

import Play from '../../commons/Icon/icons/commons/Play';
import Pause from '../../commons/Icon/icons/commons/Pause';
import BlackNote from '../../commons/Icon/icons/commons/BlackNote';
import CorcheaNote from '../../commons/Icon/icons/commons/CorcheaNote';
import SemicorcheaNote from '../../commons/Icon/icons/commons/SemicorcheaNote';

const SelectorPlayback = ({
  id,
  title,
  onChangeBPM,
  onChangeTimeSignature,
  onChangeNoteType,
  onChangePlayPause,
  valueBPM,
  valueTimeSignature,
  valueNoteType,
  isPlaying,
  isMobile,
}) => {
  const timeSignatureOptions = [
    { label: '3/4', value: '3/4' },
    { label: '4/4', value: '4/4' },
  ];

  const noteTypeOptions = [
    { label: 'negra', value: 'negra', icon: BlackNote },
    { label: 'corchea', value: 'corchea', icon: CorcheaNote },
    { label: 'semicorchea', value: 'semicorchea', icon: SemicorcheaNote },
  ];

  const handleBPMChange = (event) => {
    const bpmValue = event.target.value;
    // Only allow numbers, max 3 digits
    const numericValue = bpmValue.replace(/[^0-9]/g, '').slice(0, 3);
    
    if (numericValue === '') {
      // Allow empty input for editing
      onChangeBPM({
        label: '',
        value: null,
      });
      return;
    }
    
    const bpm = parseInt(numericValue, 10);
    if (!isNaN(bpm)) {
      // Always update the value so user can see what they're typing
      // The range validation (80-360) can be applied when the value is used for playback
      onChangeBPM({
        label: numericValue,
        value: bpm,
      });
    }
  };

  const handleTimeSignatureClick = (timeSig) => {
    onChangeTimeSignature({
      label: timeSig,
      value: timeSig,
    });
  };

  const handleNoteTypeClick = (noteType) => {
    const option = noteTypeOptions.find(opt => opt.value === noteType);
    onChangeNoteType({
      label: option?.label || noteType,
      value: noteType,
    });
  };

  return (
    <div className={classnames(
      'selector-playback',
      `selector-playback--${id}`,
    )}
    >
      <div className="selector-playback__header">
        <p className="selector-playback__title">
          {title}
        </p>
        <button
          type="button"
          className={classnames(
            'selector-playback__button',
            isPlaying && 'selector-playback__button--playing',
          )}
          onClick={onChangePlayPause}
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      </div>
      <div className="selector-playback__content">
        <div className="selector-playback__row">
          <div className="selector-playback__bpm-input-wrapper">
            <label htmlFor={`bpm-input-${id}`} className="selector-playback__bpm-label">
              BPM
            </label>
            <input
              id={`bpm-input-${id}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength="3"
              value={valueBPM?.value !== null && valueBPM?.value !== undefined ? valueBPM.value : 120}
              onChange={handleBPMChange}
              className="selector-playback__bpm-input"
            />
          </div>
          <div className="selector-playback__tabs-group">
            <span className="selector-playback__tabs-label">Time</span>
            <div className="selector-playback__tabs">
              {timeSignatureOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={classnames(
                    'selector-playback__tab',
                    valueTimeSignature?.value === option.value && 'selector-playback__tab--active',
                  )}
                  onClick={() => handleTimeSignatureClick(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="selector-playback__row">
          <div className="selector-playback__tabs-group">
            <span className="selector-playback__tabs-label">Note Velocity</span>
            <div className="selector-playback__tabs">
              {noteTypeOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={classnames(
                      'selector-playback__tab',
                      valueNoteType?.value === option.value && 'selector-playback__tab--active',
                    )}
                    onClick={() => handleNoteTypeClick(option.value)}
                  >
                    <IconComponent />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectorPlayback;
