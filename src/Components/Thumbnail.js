import React from 'react';

import Blur from './blur';

import './Thumbnail.css';

export default ({name, url, icon: Icon}) => {
  const backgroundStyle = {
    backgroundImage: `url(${url})`,
  };
  return (
    <span
      className='card'
      style={backgroundStyle}
    >
      {(url &&
        [
          <span className="text-background" style={backgroundStyle} />,
          <span className="text">{name}</span>,
          <Blur stdDev={2}/>,
        ])
      || <Icon/>
      }
    </span>
  );
}
