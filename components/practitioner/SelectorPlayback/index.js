import React from 'react';
import Select from 'react-select';
import classnames from 'classnames';

const SelectorPlayback = ({
  id,
  title,
  onChangeBPM,
  onChangeTimeSignature,
  onChangePlayPause,
  valueBPM,
  valueTimeSignature,
  isPlaying,
  isMobile,
}) => {
  // Generate BPM options (60 to 280)
  const bpmOptions = [];
  for (let i = 60; i <= 280; i++) {
    bpmOptions.push({
      label: i.toString(),
      value: i,
    });
  }

  // Time signature options
  const timeSignatureOptions = [
    { label: '3/4', value: '3/4' },
    { label: '4/4', value: '4/4' },
  ];

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
        <Select
          className="selector-playback__select"
          options={[
            {
              label: 'BPM',
              options: bpmOptions,
            },
          ]}
          onChange={onChangeBPM}
          value={valueBPM}
          isDisabled={false}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
        <Select
          className="selector-playback__select"
          options={timeSignatureOptions}
          onChange={onChangeTimeSignature}
          value={valueTimeSignature}
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
