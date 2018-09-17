import React from 'react';
import PropTypes from 'prop-types';

import {withImages} from "../GraphQL/index";

import './ImageSelector.css';

const ImageListItem = ({className, image, onClick}) => (
  <button className={`cover-button ${className}`} onClick={() => onClick(image)}>
    <img src={image.url} />
  </button>
);

const ImageSelector = ({data: {images}, onClick, onClose}) => {
  return (
    <div className="image-selector__wrapper">
      <div className="image-selector__title">
        <h1>Image Selector</h1>
        <button onClick={onClose}>X</button>
      </div>
      <div className="image-selector__list">
        {images.map(image =>
          <ImageListItem
            className="image-selector__item"
            key={image.id}
            image={image}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  )
};

ImageSelector.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

ImageSelector.defaultProps = {
  images: []
};

export default withImages(ImageSelector);
