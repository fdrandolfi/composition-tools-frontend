import React from 'react';

const data = [
  {
    id: 'gray',
    label: 'First note enabled',
  },
  {
    id: 'orange',
    label: 'Note enabled',
  },
  {
    id: 'black',
    label: 'Note disabled',
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
