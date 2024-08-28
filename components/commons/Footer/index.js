import React from 'react';
import { Tooltip } from 'react-tooltip'
import LeftArrow from './icons/LeftArrow';
import InfoSymbol from './icons/InfoSymbol';

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
      <a
        id="clickable"
        className='footer__info'
      >
        <InfoSymbol />
      </a>
      <Tooltip
        className='footer__tooltip'
        anchorSelect="#clickable"
        clickable
      >
        <a
          href={project.url}
          alt="changelog"
          className='footer__links'
        >
          {project.label.toUpperCase()}
        </a>
        <a
          href="https://feliperandolfi.com/"
          alt="website"
          className='footer__links'
        >
          FELIPERANDOLFI.COM
        </a>
      </Tooltip>
    </div>
  </section>
);

export default Footer;
