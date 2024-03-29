import React from 'react';
import PropTypes from 'prop-types';

import Config from './config.json';

import './Image.css';

const Image = (props) => (
  <div
    className="sui-component-image__wrapper"
    style={{
      width: `${props.width}%`,
    }}
  >
    <img src={props.image.url} alt={props.alt} />
  </div>
);

Image.id = Config.id;
Image.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
};

Image.defaultProps = {
  // eslint-disable-next-line backpack/use-tokens
  width: 100,
};

export default Image;
