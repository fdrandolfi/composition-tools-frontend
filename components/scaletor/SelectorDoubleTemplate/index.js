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
  switchColor = "#420e9e",
}) => (
  <div className={classnames(
    'selector-double-template',
    `selector-double-template--${id}`,
  )}
  >
    <div className="selector-double-template__content--switch">
      <p className="selector-double-template__title">
        {title}
      </p>
      <Switch
        onChange={onChangeTemplateSwitch}
        checked={checkedTemplateSwitch}
        className="selector-double-template__switch"
        onColor={switchColor}
        offColor={switchColor}
        handleDiameter={24}
        uncheckedIcon={false}
        checkedIcon={false}
        height={20}
        width={40}
      />
    </div>
    <div className="selector-double-template__content">
      <Select
        className={classnames(
          'selector-double-template__select',
          'selector-double-template__select--template',
        )}
        options={options}
        onChange={onChange}
        value={value}
        isDisabled={false}
        isSearchable={false}
        menuPlacement={isMobile ? 'top' : 'bottom'}
      />
    </div>
    {
      !isMobile && (
        <span className='selector-double-template__label'>
          The selector defines the direction of the hand.
        </span>
      )
    }
  </div>
);

export default SelectorDoubleTemplate;
