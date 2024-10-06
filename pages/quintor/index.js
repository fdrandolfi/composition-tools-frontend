import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/quintor/index.json';

import Header from '../../components/commons/Header';
import QuintorLogotype from '../../components/quintor/Logotype';
import Layout from '../../components/quintor/Layout';
import Footer from '../../components/commons/Footer';

const footer = {
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
  like: {
    label: `Like Us! ${String.fromCodePoint(0x1F389)}${String.fromCodePoint(0x1F389)}${String.fromCodePoint(0x1F389)}`,
  },
  project: {
    label: `${pkg.name} v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/quintor/CHANGELOG.md',
  },
};

const Quintor = () => (
  <>
    <Head>
      <title>
        Quintor | Chromatic Scale Tones Relationship | Composition Tools by Felipe Randolfi
      </title>
    </Head>
    <main className="quintor">
      <Header>
        <QuintorLogotype className="header__logo" />
      </Header>
      <Layout />
      <Footer
        back={footer.back}
        like={footer.like}
        project={footer.project}
      />
    </main>
  </>
);

export default Quintor;
