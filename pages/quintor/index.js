import React from 'react';
import Head from 'next/head';

import Header from '../../components/commons/Header';
import QuintorLogotype from '../../components/quintor/Logotype';
import Layout from '../../components/quintor/Layout';
import Footer from '../../components/commons/Footer';

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
        back
        like
        project
      />
    </main>
  </>
);

export default Quintor;
