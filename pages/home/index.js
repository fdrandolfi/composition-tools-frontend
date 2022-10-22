import Head from 'next/head';

import Tools from '../../components/home/Tools';
import Footer from '../../components/home/Footer';

/**
 * Home Page
 */
const HomePage = () => (
  <>
    <Head>
      <title>Composition Tools by Felipe Randolfi</title>
    </Head>
    <main className="home">
      <h1>Composition Tools</h1>
      <Tools />
      <Footer />
    </main>
  </>
);

export default HomePage;
