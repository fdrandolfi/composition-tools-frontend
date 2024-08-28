import React from 'react';

const data = [
  {
    id: 'gray',
    label: 'First Note',
  },
  {
    id: 'orange',
    label: 'Enabled Note',
  },
  {
    id: 'black',
    label: 'Disabled Note',
  },
];

const NotesHistory = () => (
  <div className="notes-history">
    {
      data.map((item) => (
        <p className="notes-history__item">
          <span className={`item--${item.id}`}>N</span>
          {item.label}
        </p>
      ))
    }
  </div>
);

export default NotesHistory;
