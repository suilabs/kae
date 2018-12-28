import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';

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

export const LongInputField = ({id, name, value, onChange, ...props}) => {
  const idName = id || name.replace(' ', '_');
  return (<div className="field">
    <label htmlFor={idName}>{name}</label>
    <textarea autoComplete={false} value={value || ''} name={idName} onChange={onChange} {...props} />
  </div>);
};

LongInputField.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

LongInputField.defaultTypes = {
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

export const ButtonRowTypes = {
  UPDATE: 'modify-action',
  CREATE: 'create-action',
  NORMAL: 'no-side-effect-action',
};

export const ButtonRow = ({deleteText, onDelete, canDelete, submitText, onSubmit, type}) => (
  <div className={`button-row ${onDelete || 'only-right'}`}>
    {onDelete &&
    <button className="delete-button delete-action" onClick={onDelete} disabled={canDelete}>{deleteText}</button>}
    <button className={`update-button ${type}`} onClick={onSubmit}>{submitText}</button>
  </div>
);

ButtonRow.propTypes = {
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
  deleteText: PropTypes.string,
  onDelete: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonRowTypes)),
};

ButtonRow.defaultProps = {
  canDelete: false,
  deleteText: 'Delete',
  type: ButtonRowTypes.NORMAL,
};

export class ImageSelectorBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const should = nextProps.src !== this.props.src ||
      nextState.show !== this.state.show;
    return !!should;
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

  render = () => [
    <div className={this.props.className}>
      <button className="cover-button" onClick={this.showOverlay}>
        <img src={this.props.src} className="cover-image" alt="selector box"/>
      </button>
    </div>,
    this.state.show &&
    <div className='image-selector-overlay__wrapper' onClick={this.closeOverlay}>
      <ImageSelector onClick={this.setImage} onClose={this.closeOverlay}/>
    </div>
  ]
}

ImageSelectorBox.propType = {
  src: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
};

ImageSelectorBox.defaultProps = {
  className: '',
  src: 'https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder-300x300.png'
};

export const RangeInput = ({id, value, config, onChange}) => {
  const tempValue = value !== undefined ? value : config.max;
  return (
    <div>
      <label>{config.label}</label>
      <button
        onClick={() => onChange(simulateEvent(id, Math.min(tempValue + config.step, config.max )))}
      >
        +
      </button>
      <input className='field-range__input' id={id} type='text' name={id} value={tempValue} onChange={onChange}/>
      <span>%</span>
      <button
        onClick={() => onChange(simulateEvent(id, Math.max(tempValue - config.step, config.min )))}
      >
        -
      </button>
    </div>
  )
};

RangeInput.propType = {
  id: PropTypes.string.isRequired,
  value: PropTypes.shape({
    step: PropTypes.number,
    max: PropTypes.number,
    min: PropTypes.number,
  }),
};

export class ColorInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showColorPicker: false,
    };
  }

  handleChangeComplete = (color) => {
    const { onChange, id } = this.props;
    const rgbColor = this.toRGBAString(color.rgb);
    onChange(simulateEvent(id, rgbColor));
  };

  toRGBAString = ({r, g, b, a}) => `rgba(${r}, ${g}, ${b}, ${a})`;

  render() {
    const { id, name, value, onChange } = this.props;
    const { showColorPicker, top, left } = this.state;
    console.log(top, left);
    const currentColor = value;
    return [
      <div className=" field field-color--wrapper">
        <label>
          {name}
          <input id={id} name={id} value={currentColor} onChange={onChange}/>
        </label>
        <div
          className="field-color__display"
          style={{ backgroundColor: currentColor }}
        >
          <button
            onClick={(event) => {
              console.log(event.clientX, event.clientY);
              console.log(event.pageX, event.pageY);
              this.setState({
                showColorPicker: !this.state.showColorPicker,
                top: `${event.clientY}px`,
                left: `${event.clientX}px`,
              })
            }}
          >
            {
              showColorPicker ? 'Close color picker' : 'Open Color Picker'
            }
          </button>
        </div>
      </div>,
      showColorPicker && <PickerPortal>
        <div
          style={{
            top: top,
            left: left,
          }}
          className="field-color__picker--wrapper"
        >
          <SketchPicker
            className="field-color__picker"
            color={value}
            onChangeComplete={this.handleChangeComplete}
          />
        </div>
      </PickerPortal>
    ];
  }
}

ColorInput.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  default: PropTypes.string.isRequired,
};

const PickerPortal = (props) => {
  return ReactDOM.createPortal(
    props.children,
    document.body,
  );
};