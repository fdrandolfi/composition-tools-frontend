import React from 'react';
import Select from 'react-select';
import classnames from 'classnames';

const Selector = ({
  id, title, options, onChange, defaultValue,
}) => (
  <div className={classnames(
    'selector',
    `selector--${id}`,
  )}
  >
    <p className="selector__title">
      {title}
    </p>
    <Select
      className="selector__select"
      options={options}
      onChange={onChange}
      defaultValue={defaultValue || options[0]}
      isDisabled={options.length === 1}
    />
  </div>
);

export default Selector;
