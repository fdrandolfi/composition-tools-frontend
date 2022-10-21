import React from 'react';

import Header from '../../components/scaletor/Header';
import Layout from '../../components/scaletor/Layout';
import Footer from '../../components/scaletor/Footer';
import Unsupported from '../../components/scaletor/Unsupported';

const Home = () => (
  <main className="scaletor">
    <Header />
    <Layout />
    <Footer />
    <Unsupported />
  </main>
);

export default Home;
