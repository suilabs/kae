import PropTypes from 'prop-types';
import React from 'react';

import TitleConfig from './config';

import './Title.css';

const Title = ({
  title, subTitle, titleColor, subTitleColor,
}) => (
  <div
    className="sui-component-title__wrapper"
  >
    <h2 style={{ color: titleColor }}>{title}</h2>
    <h3 style={{ color: subTitleColor }}>{subTitle}</h3>
  </div>
);

Title.id = TitleConfig.id;
Title.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  subTitleColor: PropTypes.string,
};

Title.defaultProps = {
  titleColor: 'black',
  subTitleColor: 'black',
};

export default Title;
