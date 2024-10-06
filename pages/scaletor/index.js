import React from 'react';
import Head from 'next/head';

import Header from '../../components/commons/Header';
import ScaletorLogotype from '../../components/scaletor/Logotype';
import Layout from '../../components/scaletor/Layout';
import Footer from '../../components/commons/Footer';

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
        back
        like
        project
      />
    </main>
  </>
);

export default Scaletor;
