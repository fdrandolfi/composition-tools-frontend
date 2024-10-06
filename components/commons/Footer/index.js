import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import LeftArrow from './icons/LeftArrow';
import Heart from './icons/Heart';
import InfoSymbol from './icons/InfoSymbol';
import classNames from 'classnames';
import formatVisitCount from './utils/formatVisitCount';

import pkg from '../../../package.json';

const footer = {
  back: {
    label: 'Back to Composition Tools',
    url: '/',
  },
  like: {
    label: `Like Us! ${String.fromCodePoint(0x1F389)}${String.fromCodePoint(0x1F389)}${String.fromCodePoint(0x1F389)}`,
  },
  project: {
    label: `Composition Tools v${JSON.stringify(pkg.version).replace('"', '').replace('"', '')} `,
    url: 'https://github.com/fdrandolfi/composition-tools-frontend/blob/main/CHANGELOG.md',
  },
};

const Footer = ({ back = false, like = false, project }) => {
  const [ visitCount, setVisitCount ] = useState(0);

  const getAllCounters = async () => {
    const res = await fetch('/api/counters', { method: 'GET' });
    const data = await res.json();

    setVisitCount(data.count);
  };

  const postCounter = async () => {
    const res = await fetch('/api/counters', { method: 'POST' });
    const data = await res.json();

    setVisitCount(data.count);
  };

  const updateCounterHandler = () => {
    postCounter();
  }

  useEffect(() => {
    getAllCounters();
  }, []);

  return (
    <section className="footer">
      {
        back && (
          <div className="footer__left">
            <a
              href={footer.back.url}
              alt="back"
            >
              <LeftArrow />
              {
                footer.back.label && (
                  <h3>
                    {footer.back.label.toUpperCase()}
                  </h3>
                )
              }
            </a>
          </div>
        )
      }
      <div className="footer__center" />
      <div className="footer__right">
        {
          like && (
            <>
              <button
                id="clickable2"
                className={classNames(
                  'footer__info',
                  'footer__info-counter',
                )}
                onClick={updateCounterHandler}
              >
                {
                  visitCount !== 0 && (
                    <span>
                      {formatVisitCount(visitCount)}
                    </span>
                  )
                }
                <Heart />
              </button>
              <Tooltip
                className='footer__tooltip'
                anchorSelect="#clickable2"
                place="left"
                clickable
              >
                <span
                  className='footer__links'
                >
                  {footer.like.label.toUpperCase()}
                </span>
              </Tooltip>
            </>
          )
        }
        <a
          id="clickable"
          className='footer__info'
        >
          <InfoSymbol />
        </a>
        <Tooltip
          className='footer__tooltip'
          anchorSelect="#clickable"
          place="left"
          openOnClick
          clickable
        >
          <a
            href={footer.project.url}
            alt="changelog"
            className='footer__links'
          >
            {footer.project.label.toUpperCase()}
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
};

export default Footer;
