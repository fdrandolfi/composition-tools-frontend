import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip'
import LeftArrow from './icons/LeftArrow';
import Heart from './icons/Heart';
import InfoSymbol from './icons/InfoSymbol';
import classNames from 'classnames';
import formatVisitCount from './utils/formatVisitCount';

const Footer = ({ back, like, project }) => {
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
                  {like.label.toUpperCase()}
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
};

export default Footer;
