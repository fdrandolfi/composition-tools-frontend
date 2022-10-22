import React from 'react';

import project from '../../../structures/scaletor/index.json';

const version = {
  label: `${project.name} v${JSON.stringify(project.version).replace('"', '').replace('"', '')} `,
  link: '/',
};

const Footer = () => (
  <section className="footer">
    <h3>
      Dedicated to all of us who learn through passion.
    </h3>
    <p>
      <a
        href={version.link}
        alt="changelog"
      >
        {version.label}
      </a>
      | © FELIPE RANDOLFI
    </p>
  </section>
);

export default Footer;
