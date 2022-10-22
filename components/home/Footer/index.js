import React from 'react';

import pkg from '../../../package.json';

const links = {
  readme: {
    label: `CompositionTools v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/readme.md',
  },
};

const Footer = () => (
  <section className="footer">
    <p>
      <a
        href={links.readme.url}
        alt="changelog"
      >
        {links.readme.label}
      </a>
      | © FELIPE RANDOLFI
    </p>
  </section>
);

export default Footer;
