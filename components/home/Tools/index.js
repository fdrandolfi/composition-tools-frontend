import React from 'react';
import ScaletorLogotype from '../../scaletor/Logotype';
import QuintorLogotype from '../../quintor/Logotype';

const items = [
  {
    id: 'item-scaletor',
    link: {
      label: 'Scaletor',
      url: '/scaletor',
    },
    image: <ScaletorLogotype className="tools__items-image" />,
  },
  {
    id: 'item-quintor',
    link: {
      label: 'Quintor',
      url: '/quintor',
    },
    image: <QuintorLogotype className="tools__items-image" />,
  },
];

const Tools = () => (
  <section className="tools">
    {
      items.map((item) => (
        <a
          id={item.id}
          className="tools__items"
          href={item.link.url}
        >
          {item.image}
        </a>
      ))
    }
  </section>
);

export default Tools;
