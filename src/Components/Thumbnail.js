import React from 'react';

import Blur from './blur';

import './Thumbnail.css';
import StatusIcon from './Icons/status';

const generateDataString = (data) => {
  return data ? `data:image/png;base64,${data}` : null
}

export default ({name, url, data, status, onClick}) => {
  const backgroundStyle = {
    backgroundImage: `url(${generateDataString(data) || url ||  '/images/imagePlaceholder.png'})`,
  };
  return (
    <span
      className='card'
      style={backgroundStyle}
      role="button"
      onClick={onClick}
    >
      {url &&
        [
          <span className="text-background" style={backgroundStyle} />,
          <span className="text">{name}</span>,
          status && <StatusIcon status={status}/>,
          <Blur stdDev={2}/>,
        ]
      }
    </span>
  );
}
