import React from 'react';
import FileUpload from '../../Service/FileUpload';

import {InputField, FieldsSection, FileField, ButtonRow, ButtonRowTypes} from '../Form';
import Thumbnail from '../Thumbnail';

import './ImageDetailsForm.css';

class ImageDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      s3: {
        url: props.url,
        name: props.filename,
      },
      file: null,
      uploading: false,
      contentHasChanged: false,
      newImage: !props.name && !props.url,
    };
  }

  onChange = ({target}) => {
    const targetName = target.name.toLowerCase();
    this.setState({
      [targetName]: target.value,
      contentHasChanged: !!this.state.s3.url,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {name, s3, contentHasChanged} = this.state;
    if (!contentHasChanged) {
      this.props.onSubmit({});
    }
    this.props.onSubmit({
      name, s3
    });
  };

  handleFileUpload = async ({target}) => {
    this.setState({
      uploading: true,
    });
    return FileUpload.upload(target.files[0])
      .then((file) => {
        this.setState({
          s3: {
            url: file.url,
            name: file.name,
          },
          name: !this.state.name ? file.name : null,
          uploading: false,
          contentHasChanged: true,
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
    const { name, s3, file , uploading, newImage, contentHasChanged } = this.state;
    return (
      <div>
        <FieldsSection name="Image Details">
          <div className="image-form__wrapper">
            <div className="image-form__thumbnail">
              <Thumbnail name={name} url={s3.url}/>
            </div>
            {
              (uploading && 'Uploading Image') ||
              <FileField name='File' value={file && file.name} onChange={this.handleFileUpload} />
            }
            <InputField name='Name' value={name || s3.name} onChange={this.onChange} />
          </div>
        </FieldsSection>
        <ButtonRow
          submitText='Save'
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          deleteText="Delete"
          type={!contentHasChanged ? ButtonRowTypes.NORMAL : newImage ? ButtonRowTypes.CREATE : ButtonRowTypes.UPDATE}
        />
      </div>
    );
  }
}

export default ImageDetailsForm;
