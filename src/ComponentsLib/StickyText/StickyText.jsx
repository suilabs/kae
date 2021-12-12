import React from 'react';
import PropTypes from 'prop-types';

import Config from './config.json';

import './StickyText.scss';

const StickyText = props => (
  <div
    className="sui-component-sticky-text__wrapper"
  >
    <p>
      {props.text}
    </p>
  </div>
);

StickyText.id = Config.id;
StickyText.propTypes = {
  text: PropTypes.string.isRequired,
};

export default StickyText;
