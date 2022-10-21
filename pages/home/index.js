import client from '../../structures/client';

const { pages } = client;
const { home } = pages;
const { sections } = home;

/**
 * Home Page
 */
const HomePage = () => (
  <div className="home">
    <h1>{sections.title}</h1>
  </div>
);

export default HomePage;
