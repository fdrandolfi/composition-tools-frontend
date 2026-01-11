import React from 'react';
import Head from 'next/head';

import Header from '../../components/commons/Header';
import PractitionerLogotype from '../../components/practitioner/Logotype';
import Footer from '../../components/commons/Footer';

const Practitioner = () => (
  <>
    <Head>
      <title>
        Practitioner | Guitar Exercises Sampler | Composition Tools by Felipe Randolfi
      </title>
    </Head>
    <main className="practitioner">
      <Header>
        <PractitionerLogotype className="header__logo" />
      </Header>
      <Footer
        back
        like
        project
      />
    </main>
  </>
);

export default Practitioner;
