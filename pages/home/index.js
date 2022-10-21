import Head from 'next/head';

/**
 * Home Page
 */
const HomePage = () => (
  <>
    <Head>
      <title>Composition Tools by Felipe Randolfi</title>
    </Head>
    <main className="home">
      <span>
        Tools:
        <a href="/scaletor">Ir a Scaletor</a>
      </span>
    </main>
  </>
);

export default HomePage;
