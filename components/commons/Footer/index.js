import React from 'react';

const Footer = ({ project, back }) => (
  <section className="footer">
    {
      back && (
        <p>
          <a
            href={back.url}
            alt="back"
          >
            {back.label}
          </a>
        </p>
      )
    }
    <h3>
      Dedicated to all of us who learn through passion.
    </h3>
    <p>
      <a
        href={project.url}
        alt="changelog"
      >
        {project.label}
      </a>
      {' | © '}
      <a
        href="https://feliperandolfi.com/"
        alt="website"
      >
        Felipe Randolfi
      </a>
    </p>
  </section>
);

export default Footer;
