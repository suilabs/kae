import React from 'react';

import { withImageMutation, withImage } from './GraphQL';
import Thumbnail from './Thumbnail';
import { FieldsSection, SelectInput, InputField } from './Form';

const ImageDetailsForm = ({name, url, onChange}) => {
  <div>
    <FieldsSection name="Image Details">
      <Thumbnail name={name} url={url}/>
      <InputField name={name} value={name} onChange={onChange} />
    </FieldsSection>
  </div>
};


class ImageDetails extends React.Component {
  constructor(props) {
    super(props);

    const { data: { image } } = props;

    this.state = {
      id: image.id,
      name: image.name,
      url: image.url,
    }
  }

  render() {

  }
}
