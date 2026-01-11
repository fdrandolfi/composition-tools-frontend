import React from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import classnames from 'classnames';

const SelectorExercises = ({
  id,
  title,
  optionsExercises,
  onChangeBPM,
  onChangeExercise,
  onChangeExerciseSwitch,
  checkedExerciseSwitch,
  valueBPM,
  valueExercise,
  isMobile,
}) => {
  // Generar opciones de BPM (80 a 240)
  const bpmOptions = [];
  for (let i = 80; i <= 240; i++) {
    bpmOptions.push({
      label: i.toString(),
      value: i,
    });
  }

  return (
    <div className={classnames(
      'selector-exercises',
      `selector-exercises--${id}`,
    )}
    >
      <div className="selector-exercises__content--switch">
        <p className="selector-exercises__title">
          {title}
        </p>
        <Switch
          onChange={onChangeExerciseSwitch}
          checked={checkedExerciseSwitch}
          className="selector-exercises__switch"
          onColor="#420e9e"
          handleDiameter={24}
          uncheckedIcon={false}
          checkedIcon={false}
          height={20}
          width={40}
        />
      </div>
      <div className="selector-exercises__content">
        <Select
          className={classnames(
            'selector-exercises__select',
            'selector-exercises__select--bpm',
          )}
          options={[
            {
              label: 'BPM',
              options: bpmOptions,
            },
          ]}
          onChange={onChangeBPM}
          value={valueBPM}
          isDisabled={!checkedExerciseSwitch}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
        <Select
          className={classnames(
            'selector-exercises__select',
            'selector-exercises__select--exercise',
          )}
          options={[
            {
              label: 'Exercises',
              options: optionsExercises,
            },
          ]}
          onChange={onChangeExercise}
          value={valueExercise}
          isDisabled={!checkedExerciseSwitch}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
      </div>
    </div>
  );
};

export default SelectorExercises;
