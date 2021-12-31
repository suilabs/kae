import React from 'react';
import PropTypes from 'prop-types';

import HeroImageConfig from './config.json';

// import './HeroImage.css';

const Carrousel = (props) => (
  <div
    className="sui-component-heroImage__wrapper"
    style={{
      backgroundImage: `url(${props.image.url})`,
      minHeight: props.height,
    }}
  >
  </div>
);

Carrousel.id = HeroImageConfig.id;
Carrousel.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  height: PropTypes.string,
  titleColor: PropTypes.string,
  subTitleColor: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

Carrousel.defaultProps = {
  title: '',
  subTitle: '',
  height: '7rem',
  titleColor: '#000',
  subTitleColor: '#000',
};

export default Carrousel;
