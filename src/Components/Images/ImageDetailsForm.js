import React from 'react';
import FileUpload from '../../Service/FileUpload';

import {InputField, FieldsSection, FileField, ButtonRow} from '../Form';
import Thumbnail from '../Thumbnail';

import './ImageDetailsForm.css';

class ImageDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      url: props.url,
      file: null,
      uploading: false,
    };
  }

  onChange = ({target}) => {
    const targetName = target.name.toLowerCase();
    this.setState({
      [targetName]: target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {name, url} = this.state;
    this.props.onSubmit({
      name, url
    });
  };

  handleFileUpload = async ({target}) => {
    this.setState({
      uploading: true,
    });
    return FileUpload.upload(target.files[0])
      .then((url) => {
        this.setState({
          url,
          uploading: false,
        });
      });
  };

  onDelete = (e) => {
    e.preventDefault();

    if (window.confirm('Delete image?')) {
      this.props.onDelete(this.state.id);
    }
  };

  render() {
    const { name, url, file, uploading } = this.state;
    return (
      <div>
        <FieldsSection name="Image Details">
          <div className="image-form__wrapper">
            <div className="image-form__thumbnail">
              {name && <Thumbnail name={name} url={url}/>}
            </div>
            {
              (uploading && 'Uploading Image') ||
              <FileField name='File' value={file} onChange={this.handleFileUpload} />
            }
            <InputField name='Name' value={name} onChange={this.onChange} />
          </div>
        </FieldsSection>
        <ButtonRow
          submitText="Update"
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          deleteText="Delete"
        />
      </div>
    );
  }
}

export default ImageDetailsForm;
