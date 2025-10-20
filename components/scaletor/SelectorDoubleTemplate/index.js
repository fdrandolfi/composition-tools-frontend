import React from 'react';
import Switch from 'react-switch';
import classnames from 'classnames';

const SelectorDoubleTemplate = ({
  id,
  title,
  onChangeTemplateSwitch,
  checkedTemplateSwitch,
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
  </div>
);

export default SelectorDoubleTemplate;
