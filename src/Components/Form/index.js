import React from 'react';
import PropTypes from 'prop-types';

import './Form.css';

export const InputField = ({name, value, onChange}) => (
  <div className="field">
    <label htmlFor={name.replace(' ', '_')}>{name}</label>
    <input type="text" value={value} name={name.replace(' ', '_')} onChange={onChange} />
  </div>
);

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
      {options.map(({ id, name }) => {
        console.log(id, name);
        return <option key={id} value={id}>{name}</option>
      })}
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
