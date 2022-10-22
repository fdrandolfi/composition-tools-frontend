import React from 'react';

import project from '../../../structures/scaletor/index.json';

const links = {
  readme: {
    label: `${project.name} v${JSON.stringify(project.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/scaletor/readme.md',
  },
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
};

const Footer = () => (
  <section className="footer">
    <h3>
      Dedicated to all of us who learn through passion.
    </h3>
    <p>
      <a
        href={links.readme.url}
        alt="changelog"
      >
        {links.readme.label}
      </a>
      | © FELIPE RANDOLFI
    </p>
    <p>
      <a
        href={links.back.url}
        alt="back"
      >
        {links.back.label}
      </a>
    </p>
  </section>
);

export default Footer;
