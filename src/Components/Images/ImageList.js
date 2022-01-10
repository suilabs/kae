import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Thumbnail from '../Thumbnail';

import {withImages} from "../GraphQL/index";

const ImageListItem = ({image: {id, name, url, destUrl}}) => (
  <Link
    to={destUrl || `/image/id/${id}`}
    className="card-link"
  >
    <Thumbnail
      name={name}
      url={url}
    />
  </Link>
);

const newImage = {
  id: 'new',
  destUrl: '/image/new',
  name: 'Create New Image',
  url: '/favicon.ico',
};

const ImageList = ({data: {images}}) => {
  return (
    <div>
      <h1>Image list</h1>
      <div className={'.list'}>
        {[newImage, ...images].map(image =>
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
