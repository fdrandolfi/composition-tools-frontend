import React from 'react';

import pkg from '../../../package.json';

const version = {
  label: `Composition Tools v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
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
