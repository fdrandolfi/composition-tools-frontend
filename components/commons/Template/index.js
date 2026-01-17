import React from 'react';
import classNames from 'classnames';

import { allTemplates } from '../../../structures/commons/templates';

const Template = ({ id, templateMode }) => {
  const baseUrl = '/images/scaletor/';
  return (
    <div className={classNames(
      "template",
      templateMode && 'template__template-right',
    )}>
      <img
        className="template__image"
        src={`${baseUrl}${allTemplates[id].imgSrc}`}
        alt=""
      />
    </div>
  );
};

export default Template;
