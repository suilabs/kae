import React from 'react';
import PropTypes from 'prop-types';

import ParagraphConfig from './config.json';

import './Paragraph.css';

const Paragraph = (props) => (
  <div
    className="sui-component-paragraph__wrapper"
    style={{
      width: `${props.width}%`,
      color: props.textColor,
    }}
  >
    <p>{props.text}</p>
  </div>
);

Paragraph.id = ParagraphConfig.id;
Paragraph.propTypes = {
  text: PropTypes.string.isRequired,
  width: PropTypes.number,
  textColor: PropTypes.string,
};

Paragraph.defaultProps = {
  // eslint-disable-next-line backpack/use-tokens
  width: 100,
  textColor: 'black',
};

export default Paragraph;
