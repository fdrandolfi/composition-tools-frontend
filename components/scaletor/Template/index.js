import React from 'react';

import { allTemplates } from '../../../structures/client/pages/scaletor/templates';

const Template = ({ id }) => {
  const baseUrl = '/images/scaletor/';
  return (
    <div className="template">
      <img
        className="template__image"
        src={`${baseUrl}${allTemplates[id].imgSrc}`}
        alt=""
      />
    </div>
  );
};

export default Template;
