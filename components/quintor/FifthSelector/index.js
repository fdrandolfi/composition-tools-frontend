import React from 'react';
import Select from 'react-select';
import classnames from 'classnames';

const FifthSelector = ({
  id, title, options, onChange, defaultValue,
}) => (
  <div className={classnames(
    'fifth-selector',
    `fifth-selector--${id}`,
  )}
  >
    <p className="fifth-selector__title">
      {title}
    </p>
    <Select
      className="fifth-selector__select"
      options={options}
      onChange={onChange}
      defaultValue={defaultValue || options[0]}
      isDisabled={options.length === 1}
    />
  </div>
);

export default FifthSelector;
