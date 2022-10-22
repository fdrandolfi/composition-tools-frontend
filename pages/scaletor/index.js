import React from 'react';
import Head from 'next/head';

import pkg from '../../structures/scaletor/index.json';

import Header from '../../components/scaletor/Header';
import Layout from '../../components/scaletor/Layout';
import Footer from '../../components/commons/Footer';
import Unsupported from '../../components/scaletor/Unsupported';

const footer = {
  project: {
    label: `${pkg.name} v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/readme.md',
  },
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
};

const Home = () => (
  <>
    <Head>
      <title>Scaletor | Composition Tools by Felipe Randolfi</title>
    </Head>
    <main className="scaletor">
      <Header />
      <Layout />
      <Footer
        project={footer.project}
        back={footer.back}
      />
      <Unsupported />
    </main>
  </>
);

export default Home;
