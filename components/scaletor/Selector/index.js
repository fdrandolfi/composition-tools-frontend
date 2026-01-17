import React from 'react';
import Select from 'react-select';
import classnames from 'classnames';

const Selector = ({
  id, title, options, onChange, defaultValue, value, isMobile, isDisabled
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
      value={value}
      isDisabled={isDisabled !== undefined ? isDisabled : options.length === 1}
      isSearchable={false}
      menuPlacement={isMobile ? 'top' : 'bottom'}
    />
  </div>
);

export default Selector;
