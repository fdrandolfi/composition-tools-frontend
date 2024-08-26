/* eslint-disable react/jsx-props-no-spreading */
import Head from 'next/head';
import Script from 'next/script';

import '../styles/main.scss';

const App = ({ Component, pageProps }) => {
  // Global Site Tag (gtag.js) - Google Analytics
  const GTMScript = (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );

  // SEO
  const SEO = () => (
    <Head>
      <title>Scalator - Guitar, Bass & Keyboard Scale Generator | Free Music Composition Tool by Felipe Randolfi</title>
      <meta name="description" content="Discover Scalator, a free online tool for guitarists, bassists, and keyboardists to generate scales and explore tunings. Choose from various instrument templates like PRS Custom 24, Gibson Les Paul, Fender Stratocaster, Dean Cadillac, and more. Includes Quintor, the ultimate circle of fifths tool. Created by Felipe Randolfi." />
      <meta name="keywords" content="guitar scales, bass scales, keyboard scales, music composition tool, guitar tuning, circle of fifths, PRS Custom 24, Gibson Les Paul, Fender Stratocaster, Dean Cadillac, drop tuning, Quintor, music theory, guitar templates, free music tool, Felipe Randolfi" />
      <meta property="og:title" content="Scalator - Free Guitar, Bass & Keyboard Scale Generator" />
      <meta property="og:description" content="Generate scales, explore tunings, and use templates from popular guitar brands. Quintor, the circle of fifths tool, included." />
      <meta property="og:url" content="https://tools.feliperandolfi.com" />
      <meta property="og:image" content="https://tools.feliperandolfi.com/images/seo/scalator-og.jpg" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Scalator - Guitar, Bass & Keyboard Scale Generator" />
      <meta name="twitter:description" content="Free tool for musicians to generate scales, explore tunings, and use popular guitar templates. Includes Quintor, the circle of fifths tool." />
      <meta name="twitter:image" content="https://tools.feliperandolfi.com/images/seo/scalator-tc.jpg" />
      <link rel="canonical" href="https://tools.feliperandolfi.com" />
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://tools.feliperandolfi.com",
            "name": "Scalator - Guitar, Bass & Keyboard Scale Generator",
            "description": "A free tool for guitarists, bassists, and keyboardists to generate scales, explore tunings, and use popular guitar templates. Includes Quintor, the circle of fifths tool.",
            "creator": {
              "@type": "Person",
              "name": "Felipe Randolfi"
            },
            "image": "https://tools.feliperandolfi.com/images/seo/scalator-wgu.jpg",
            "publisher": {
              "@type": "Organization",
              "name": "Felipe Randolfi"
            },
            "potentialAction": [
              {
                "@type": "SearchAction",
                "target": "https://tools.feliperandolfi.com/scaletor",
                "name": "Search Scales"
              },
              {
                "@type": "SearchAction",
                "target": "https://tools.feliperandolfi.com/quintor",
                "name": "Search Circle of Fifths"
              }
            ]
          }
        `}
      </script>
    </Head>
  );

  return (
    <>
      { GTMScript }
      { SEO }
      <Component {...pageProps} />;
    </>
  );
};

export default App;
