import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/fifthtor/index.json';

import Header from '../../components/commons/Header';
import FifthtorLogotype from '../../components/fifthtor/Logotype';
import Layout from '../../components/commons/Layout';
import Footer from '../../components/commons/Footer';
import Unsupported from '../../components/commons/Unsupported';

const footer = {
  project: {
    label: `${pkg.name} v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/structures/fifthtor/CHANGELOG.md',
  },
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
};

const Fifthtor = () => (
  <>
    <Head>
      <title>
        Fifthtor | Chromatic Scale Tones Relationship | Composition Tools by Felipe Randolfi
      </title>
    </Head>
    <main className="fifthtor">
      <Header>
        <FifthtorLogotype className="header__logo" />
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

export default Fifthtor;
