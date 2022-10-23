import Head from 'next/head';

import pkg from '../../package.json';

import Tools from '../../components/home/Tools';
import Footer from '../../components/commons/Footer';
import Unsupported from '../../components/commons/Unsupported';

const footer = {
  project: {
    label: `Composition Tools v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/CHANGELOG.md',
  },
  back: null,
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
        project={footer.project}
        back={footer.back}
      />
      <Unsupported />
    </main>
  </>
);

export default HomePage;
