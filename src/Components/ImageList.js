import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Thumbnail from './Thumbnail';
import {withImages} from "./GraphQL";

const ImageListItem = ({image: {id, name, url}}) => (
  <Link
    to={`/images/${id}`}
    className="card-link"
  >
    <Thumbnail
      name={name}
      url={url}
    />
  </Link>
);

const ImageList = ({data: {images}}) => {
  return (
    <div>
      <h1>Image list</h1>
      <div className={'.list'}>
        {images.map(image =>
          <ImageListItem key={image.id} image={image} />
        )}
      </div>
    </div>
  )
};

ImageList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  )
};

ImageList.defaultProps = {
  projects: []
};

export default withImages(ImageList);
