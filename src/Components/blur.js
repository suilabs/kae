import React from 'react';

export default ({ stdDev }) => (
  <svg>
    <defs>
      <filter id="blur">
        <feGaussianBlur in="SourceGraphic" stdDeviation={stdDev} />
      </filter>
    </defs>
  </svg>
);
