import React from 'react';
import {Mutation} from 'react-apollo';
import { CreateImageQuery } from '../GraphQL';
import ImageDetailsForm from './ImageDetailsForm';

import bus from '../../Core/bus';

class NewImage extends React.Component {
  createImage = (mutation) => (image) => {
    if (image) {
      mutation({ variables: image });
    }
  };

  onComplete = () => {
    this.props.history.push('/images');
    bus.publish('success', 'Image created');
  };

  onError = () => {
    bus.publish('exit', 'Error uploading image');
  };

  render() {
    return (
      <Mutation
        mutation={CreateImageQuery}
        onCompleted={this.onComplete}
        onError={this.onError}
      >
        {(createImage) => <ImageDetailsForm
            {...this.state}
            onSubmit={this.createImage(createImage)}
          />
        }
      </Mutation>
    )
  }
}

export default NewImage;
