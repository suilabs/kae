import React from 'react';
import PropTypes from 'prop-types';

import ImageSelector from '../Images/ImageSelector';
import { simulateEvent } from '../../Core/Utils';

import './Form.css';

export const InputField = ({id, name, value, onChange, ...props}) => {
  const idName = id || name.replace(' ', '_');
  return (<div className="field">
    <label htmlFor={idName}>{name}</label>
    <input type="text" value={value || ''} name={idName} onChange={onChange} {...props} />
  </div>);
};

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

InputField.defaultTypes = {
  value: '',
};

export const FieldsSection = ({ name, children }) => (
  <div className="fields-section">
    <span className="fields-section__name">{name}</span>
    {children}
  </div>
);

FieldsSection.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
};

FieldsSection.defaultProps = {
  children: [],
};

export const SelectInput = ({ name, options, value, onChange }) => (
  <div className="field">
    <label htmlFor={name.replace(' ', '_')}>{name}</label>
    <select name={name.replace(' ', '_')} onChange={onChange} value={value}>
      <option value="select">Select</option>
      {options.map(({ id, name }) => ( <option key={id} value={id}>{name}</option> ))}
    </select>
  </div>
);

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func,
};

SelectInput.defaultProps = {
  options: [],
  onChange: () => {},
};

export const FileField = ({name, file, onChange}) => (
  <div className="field">
    <label htmlFor={name.replace(' ', '_')}>{name}</label>
    <input type="file" accept="image/*" name={name.replace(' ', '_')} value={file} onChange={onChange}/>
  </div>
);

export const ButtonRow = ({deleteText, onDelete, canDelete, submitText, onSubmit}) => (
  <div className={`button-row ${onDelete || 'only-right'}`}>
    {onDelete &&
    <button className="delete-button" onClick={onDelete} disabled={canDelete}>{deleteText}</button>}
    <button className="update-button" onClick={onSubmit}>{submitText}</button>
  </div>
);

ButtonRow.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
  deleteText: PropTypes.string,
  onDelete: PropTypes.func,
};

ButtonRow.defaultProps = {
  canDelete: false,
  deleteText: 'Delete',
};

export class ImageSelectorBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  setImage = (image) => {
    this.props.onChange(simulateEvent(this.props.id, image));
  };

  showOverlay = () => {
    this.setState({
      show: true,
    });
  };

  closeOverlay = () => {
    this.setState({
      show: false,
    });
  };

  render = () => (
    <div>
      <button className="cover-button" onClick={this.showOverlay}>
        <img src={this.props.src} className="cover-image"/>
      </button>
      {this.state.show &&
        <div className="image-selector-overlay__wrapper" onClick={this.closeOverlay}>
            <ImageSelector onClick={this.setImage} onClose={this.closeOverlay}/>
        </div>
      }
    </div>
  )
}

ImageSelectorBox.propType = {
  src: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};