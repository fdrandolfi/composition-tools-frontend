import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/scaletor/index.json';

import Header from '../../components/commons/Header';
import ScaletorLogotype from '../../components/scaletor/Logotype';
import Layout from '../../components/scaletor/Layout';
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
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/scaletor/CHANGELOG.md',
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
        back={footer.back}
        like={footer.like}
        project={footer.project}
      />
    </main>
  </>
);

export default Scaletor;
