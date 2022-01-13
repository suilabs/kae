import React from 'react';
import PropTypes from 'prop-types';

import {withImages} from "../GraphQL/index";
import Modal from '../Modal/Modal';

import './ImageSelector.css';

const ImageListItem = ({className, image, onClick}) => (
  <button className={`cover-button ${className}`} onClick={() => onClick(image)}>
    <img src={image.thumbnailUrl} alt="list item"/>
    <p>{image.name}</p>
  </button>
);

class ImageSelector extends React.Component {
  render () {
    const { data: {images}, onClick, onClose } = this.props;
    return (
      <Modal
        onClose={onClose}
      >
        <div className="image-selector__title">
          <h1>Choose and Image</h1>
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
      </Modal>
    );
  }
}

const imageShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
);

ImageSelector.propTypes = {
  data: PropTypes.shape({
    images: imageShape,
  }),
  onClick: PropTypes.func,
  onClose: PropTypes.func,
};

ImageSelector.defaultProps = {
  data: {
    images: [],
  },
  onClick: () => {},
  onClose: () => {},
};

export default withImages(ImageSelector);
