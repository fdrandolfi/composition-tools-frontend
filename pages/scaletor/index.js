import React from 'react';
import Head from 'next/head';

import Header from '../../components/scaletor/Header';
import Layout from '../../components/scaletor/Layout';
import Footer from '../../components/scaletor/Footer';
import Unsupported from '../../components/scaletor/Unsupported';

const Home = () => (
  <>
    <Head>
      <title>Scaletor | Composition Tools by Felipe Randolfi</title>
    </Head>
    <main className="scaletor">
      <Header />
      <Layout />
      <Footer />
      <Unsupported />
    </main>
  </>
);

export default Home;
