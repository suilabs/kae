import React from 'react';
import {withRouter} from 'react-router-dom';
import {Mutation} from 'react-apollo';

import {ImageDeleteQuery, ImageUpdateQuery, withImage} from '../GraphQL';
import ImageDetailsForm from './ImageDetailsForm';

import bus from '../../Core/bus';

class ImageDetails extends React.Component {
  constructor(props) {
    super(props);

    const {data: {image}} = props;

    this.state = {
      id: image.id,
      name: image.name,
      url: image.url,
    };

    this.onDelete = this.onDelete.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onCompleted = (operation) => (object) => {
    this.props.history.push('/images');
    bus.publish('success', `${operation}: Image ${object[Object.keys(object)[0]].name} successfuly`);
  };

  onError = (operation) => (error) => {
    const message = error.networkError.result.errors[0].message;
    bus.publish('error', `Error when trying to ${operation} ${message}`);
  };

  onUpdate = (mutation) => ({name, url}) => {
    const image = {
      id: this.props.data.image.id,
      name, url,
    };
    mutation({
      variables: image
    });
  };

  onDelete = (mutation) => () => {
    mutation({
      variables: {
        ids: [this.props.data.image.id],
      }
    });
  };

  render() {
    return (
      <div>
        <h1>Edit Image</h1>
        <Mutation
          mutation={ImageUpdateQuery}
          onCompleted={this.onCompleted('updated')}
          onError={this.onError('update')}
        >
          {(updateImage) => (
            <Mutation
              mutation={ImageDeleteQuery}
              onCompleted={this.onCompleted('delete')}
              onError={this.onError('delete')}
            >
              {(deleteImages) => (
                <ImageDetailsForm
                  {...this.state}
                  onSubmit={this.onUpdate(updateImage)}
                  onDelete={this.onDelete(deleteImages)}
                />
              )}
            </Mutation>
          )}
        </Mutation>
      </div>
    );
  }
}

const ImageDetailWithQuery = withImage(ImageDetails);

export default withRouter((props) => {
  return (<ImageDetailWithQuery
    variables={{id: props.match.params.id}}
    {...props}
  />);
});
