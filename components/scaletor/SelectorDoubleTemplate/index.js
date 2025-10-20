import React from 'react';
import Select from 'react-select';
import Switch from 'react-switch';
import classnames from 'classnames';

const SelectorDoubleTemplate = ({
  id,
  title,
  options,
  onChange,
  onChangeTemplateSwitch,
  checkedTemplateSwitch,
  value,
  isMobile,
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
        onChange={onChangeTemplateSwitch}
        checked={checkedTemplateSwitch}
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
        className={classnames(
          'selector-double__select',
          'selector-double__select--template',
        )}
        options={options}
        onChange={onChange}
        value={value}
        isDisabled={false}
        isSearchable={false}
        menuPlacement={isMobile ? 'top' : 'bottom'}
      />
    </div>
  </div>
);

export default SelectorDoubleTemplate;
