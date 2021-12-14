import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import { ImageSelectorBox } from '../Form';
import { simulateEvent } from '../../Core/Utils';

const eGroupSelector = ({images, onChange, id, className}) => {
  const onSingleImageChange = (({target: { name, value: modifiedImage }}) => {
    let newImages = images.map((image) => image.id !== name ? image : modifiedImage)
    if (!name) {
      newImages.push(modifiedImage)
    }
    onChange(simulateEvent(id, newImages))
  })

  return (
    <div className="field">
      {images.map(({url, id}) => <ImageSelectorBox key={id} id={id} src={url} onChange={onSingleImageChange}/>)}
      <ImageSelectorBox src={null} onChange={onSingleImageChange} />
    </div>
  )

}

ImageGroupSelector.propTypes = {
  images: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
}

ImageGroupSelector.defaultProps = {
  className: '',
  images: [],
}

export default ImageGroupSelector
