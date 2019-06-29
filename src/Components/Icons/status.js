import React from 'react';

import './status.css';

const statusColors = {
  PUBLISHED: '#47993A',
  DRAFT: '#99933F',
};

export default ({ status }) => (
  <div className="status-icon">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.7 426.7" fill={statusColors[status]}
         width={100}
    >
      <path
        d="M213.3 106.7c-58.9 0-106.7 47.8-106.7 106.7S154.5 320 213.3 320 320 272.2 320 213.3 272.2 106.7 213.3 106.7z"/>
      <path
        d="M213.3 0C95.5 0 0 95.5 0 213.3s95.5 213.3 213.3 213.3S426.7 331.2 426.7 213.3 331.2 0 213.3 0zM213.3 384c-94.3 0-170.7-76.4-170.7-170.7S119 42.7 213.3 42.7 384 119 384 213.3 307.6 384 213.3 384z"/>
    </svg>
  </div>
);
