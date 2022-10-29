import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/scaletor/index.json';

import Header from '../../components/commons/Header';
import ScaletorLogotype from '../../components/scaletor/Logotype';
import Layout from '../../components/scaletor/Layout';
import Footer from '../../components/commons/Footer';
import Unsupported from '../../components/commons/Unsupported';

const footer = {
  project: {
    label: `${pkg.name} v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/scaletor/CHANGELOG.md',
  },
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
};

const Scaletor = () => (
  <>
    <Head>
      <title>
        Scaletor | Guitar, Bass & Keyboard Scale Generator | Composition Tools by Felipe Randolfi
      </title>
    </Head>
    <main className="scaletor">
      <Header>
        <ScaletorLogotype className="header__logo" />
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

export default Scaletor;
