import React from 'react';
import Select from 'react-select';
import classnames from 'classnames';

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
    { label: 'Negra', value: 'negra' },
    { label: 'Corchea', value: 'corchea' },
    { label: 'Semicorchea', value: 'semicorchea' },
  ];

  const handleBPMChange = (event) => {
    const bpmValue = event.target.value;
    if (bpmValue === '') {
      return;
    }
    const bpm = parseInt(bpmValue, 10);
    if (!isNaN(bpm) && bpm >= 80 && bpm <= 280) {
      onChangeBPM({
        label: bpm.toString(),
        value: bpm,
      });
    }
  };

  return (
    <div className={classnames(
      'selector-playback',
      `selector-playback--${id}`,
    )}
    >
      <p className="selector-playback__title">
        {title}
      </p>
      <div className="selector-playback__content">
        <div className="selector-playback__bpm-input-wrapper">
          <label htmlFor={`bpm-input-${id}`} className="selector-playback__bpm-label">
            BPM
          </label>
          <input
            id={`bpm-input-${id}`}
            type="number"
            min="80"
            max="280"
            step="1"
            value={valueBPM?.value || 120}
            onChange={handleBPMChange}
            className="selector-playback__bpm-input"
          />
        </div>
        <Select
          className="selector-playback__select"
          options={timeSignatureOptions}
          onChange={onChangeTimeSignature}
          value={valueTimeSignature}
          isDisabled={false}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
        <Select
          className="selector-playback__select"
          options={noteTypeOptions}
          onChange={onChangeNoteType}
          value={valueNoteType}
          isDisabled={false}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
        <button
          type="button"
          className={classnames(
            'selector-playback__button',
            isPlaying && 'selector-playback__button--playing',
          )}
          onClick={onChangePlayPause}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default SelectorPlayback;
