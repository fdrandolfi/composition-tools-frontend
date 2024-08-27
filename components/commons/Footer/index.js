import React from 'react';
import LeftArrow from './icons/LeftArrow';

const Footer = ({ project, back }) => (
  <section className="footer">
    {
      back && (
        <div className="footer__left">
          <a
            href={back.url}
            alt="back"
          >
            <LeftArrow />
            {
              back.label && (
                <h3>
                  {back.label.toUpperCase()}
                </h3>
              )
            }
          </a>
        </div>
      )
    }
    <div className="footer__center" />
    <div className="footer__right">
      <p>
        <a
          href={project.url}
          alt="changelog"
        >
          {project.label.toUpperCase()}
        </a>
        {', '}
        <a
          href="https://feliperandolfi.com/"
          alt="website"
        >
          FELIPERANDOLFI.COM
        </a>
      </p>
    </div>
  </section>
);

export default Footer;
