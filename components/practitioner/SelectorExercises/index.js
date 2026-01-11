import React from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import classnames from 'classnames';

const SelectorExercises = ({
  id,
  title,
  optionsExercises,
  onChangeExercise,
  onChangeExerciseSwitch,
  checkedExerciseSwitch,
  valueExercise,
  isMobile,
}) => {
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
          onColor="#960A00"
          offColor="#960A00"
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
            'selector-exercises__select--exercise',
          )}
          options={optionsExercises}
          onChange={onChangeExercise}
          value={valueExercise}
          isDisabled={false}
          isSearchable={false}
          menuPlacement={isMobile ? 'top' : 'bottom'}
        />
      </div>
      {
        !isMobile && (
          <span className='selector-exercises__label'>
            The switch toggles between note name and fret number.
          </span>
        )
      }
    </div>
  );
};

export default SelectorExercises;
