import Head from 'next/head';

import pkg from '../../package.json';

import Tools from '../../components/home/Tools';
import Footer from '../../components/commons/Footer';

const footer = {
  back: null,
  like: null,
  project: {
    label: `Composition Tools v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/CHANGELOG.md',
  },
};

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
      <Footer
        back={footer.back}
        like={footer.like}
        project={footer.project}
      />
    </main>
  </>
);

export default HomePage;
