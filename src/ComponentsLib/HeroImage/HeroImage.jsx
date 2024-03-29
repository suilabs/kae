import React from 'react';
import PropTypes from 'prop-types';

import HeroImageConfig from './config.json';

import './HeroImage.css';

function invertColor(inHex, bw) {
  let hex = inHex;
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.');
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  if (bw) {
    // http://stackoverflow.com/a/3943023/112731
    const color =
      r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
    return invertColor(color);
  }
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
}

const HeroImage = (props) => (
  <div
    className="sui-component-heroImage__wrapper"
    style={{
      backgroundImage: `url(${props.image.url})`,
      minHeight: props.height,
    }}
  >
    <div
      className="sui-component-heroImage__title"
      style={{
        background: invertColor(props.titleColor, true),
      }}
    >
      <h1
        style={{
          color: props.titleColor,
        }}
      >
        {props.title}
      </h1>
      <p
        style={{
          color: props.subTitleColor,
        }}
      >
        {props.subTitle}
      </p>
    </div>
  </div>
);

HeroImage.id = HeroImageConfig.id;
HeroImage.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
  height: PropTypes.string,
  titleColor: PropTypes.string,
  subTitleColor: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
};

HeroImage.defaultProps = {
  title: '',
  subTitle: '',
  height: '7rem',
  titleColor: '#000',
  subTitleColor: '#000',
};

export default HeroImage;
