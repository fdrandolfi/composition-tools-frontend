import React from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import classnames from 'classnames';

const SelectorDouble = ({
  id,
  title,
  optionsNote,
  optionsScale,
  optionsScaleModes,
  onChangeNote,
  onChangeScale,
  onChangeScaleSwitch,
  checkedScaleSwitch,
}) => (
  <div className={classnames(
    'selector-double',
    `selector-double--${id}`,
  )}
  >
    <div className="selector-double__content--switch">
      <p className="selector-double__title">
        {title}
      </p>
      <Switch
        onChange={onChangeScaleSwitch}
        checked={checkedScaleSwitch}
        className="selector-double__switch"
        onColor="#420e9e"
        handleDiameter={24}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
      />
    </div>
    <div className="selector-double__content">
      <Select
        defaultValue={optionsNote[0]}
        className={classnames(
          'selector-double__select',
          'selector-double__select--note',
        )}
        options={[
          {
            label: 'Key',
            options: optionsNote,
          },
        ]}
        onChange={onChangeNote}
        isDisabled={!checkedScaleSwitch}
      />
      <Select
        defaultValue={optionsScale[0]}
        className={classnames(
          'selector-double__select',
          'selector-double__select--scale',
        )}
        options={[
          {
            label: 'Scales',
            options: optionsScale,
          },
          {
            label: 'Greek Modes',
            options: optionsScaleModes,
          },
        ]}
        onChange={onChangeScale}
        isDisabled={!checkedScaleSwitch}
      />
    </div>
  </div>
);

export default SelectorDouble;
