import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/quintator/index.json';

import Header from '../../components/commons/Header';
import QuintatorLogotype from '../../components/quintator/Logotype';
import Layout from '../../components/quintator/Layout';
import Footer from '../../components/commons/Footer';
import Unsupported from '../../components/commons/Unsupported';

const footer = {
  project: {
    label: `${pkg.name} v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/quintator/CHANGELOG.md',
  },
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
};

const Quintator = () => (
  <>
    <Head>
      <title>
        Quintator | Chromatic Scale Tones Relationship | Composition Tools by Felipe Randolfi
      </title>
    </Head>
    <main className="quintator">
      <Header>
        <QuintatorLogotype className="header__logo" />
      </Header>
      <Layout />
      <Footer
        project={footer.project}
        back={footer.back}
      />
      <Unsupported />
    </main>
  </>
);

export default Quintator;
