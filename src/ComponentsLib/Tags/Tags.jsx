import React from 'react';
import PropTypes from 'prop-types';

import TagsConfig from './config';

import './Tags.css';

const Tags = (props) => {
  const tags =
    props.tags.split(',')
      .map(
        t => t.trim()
          .replace(/\b\w/g, l => l.toUpperCase()),
      );
  return (
    <div
      className="sui-component-tags__wrapper"
    >
      {
        tags.map(
          t =>
            (
              <span
                style={props.style}
                className="sui-component-tags__item"
              >
                {t}
              </span>
            ),
        )
      }
    </div>
  );
};

Tags.id = TagsConfig.id;
Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.shape({
    color: PropTypes.string,
  }),
};

Tags.defaultProps = {
  style: {
    color: '#000',
  },
};

export default Tags;
