import React from 'react';
import FileService from '../../Service/FileService';

import {InputField, FieldsSection, FileField, ButtonRow, ButtonRowTypes} from '../Form';
import Thumbnail from '../Thumbnail';

import './ImageDetailsForm.css';
import Loading from '../Loading/Loading';

class ImageDetailsForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      pic: {
        url: props.url,
        thumbnailUrl: props.thumbnailUrl,
        data: null,
        filename: props.filename,
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
      contentHasChanged: !!this.state.pic.url || (this.props.name && this.props.name !== this.state.name),
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {name, pic, contentHasChanged} = this.state;
    if (!contentHasChanged) {
      this.props.onSubmit({});
    }
    this.props.onSubmit({
      name, pic
    });
  };

  handleFileUpload = async ({target}) => {
    this.setState({
      uploading: true,
    });
    return FileService.upload(target.files[0])
      .then((response) => {
        const [ original, thumbnail, preview ] = response.images;
        this.setState({
          pic: {
            url: original.url,
            thumbnailUrl: thumbnail.url,
            data: preview.base64,
            name: original.name,
          },
          name: !this.state.name ? original.name : null,
          uploading: false,
          contentHasChanged: true,
        });
      });
  };

  setRef = (ref) => {
    this.inputRef = ref;
  }

  onDelete = (e) => {
    e.preventDefault();

    if (window.confirm('Delete image?')) {
      this.props.onDelete(this.state.id);
    }
  };

  onThumbnailClick = () => {
    this.inputRef.click()
  }

  render() {
    const { name, pic, file, uploading, newImage, contentHasChanged } = this.state;
    return (
      <div>
        <FieldsSection name="Image Details">
          <div className="image-form__wrapper">
            <div className="image-form__thumbnail">
              <Thumbnail name={name} url={pic.thumbnailUrl || pic.url} data={pic.data} onClick={this.onThumbnailClick}/>
            </div>
            {
              (uploading && <Loading />) ||
              <FileField setRef={this.setRef} name='File' value={file && file.name} onChange={this.handleFileUpload} />
            }
            <InputField name='Name' value={name || pic.filename} onChange={this.onChange} />
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
