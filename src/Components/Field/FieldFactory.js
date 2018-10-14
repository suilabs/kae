import React from 'react';
import { InputField, ImageSelectorBox, FieldsSection } from '../../Components/Form';
import ImageStrip from './ImageStrip';

const FieldFactory = {
  renderField(template, value, onChange) {
    const { id, type, name } = template;
    switch(type) {
      case 'TEXT':
        return <InputField id={id} name={name} value={value} onChange={onChange} />;
      case 'IMAGE':
        return (
          <FieldsSection name={name}>
            <ImageSelectorBox id={id} value={value} onChange={onChange} />;
          </FieldsSection>
        );
      case 'ARRAY_IMAGE':
        return (
          <FieldsSection name={name}>
            <ImageStrip srcset={value ? value.split(';') : []} id={id} onChange={onChange} />
          </FieldsSection>
        );
      default:
        console.err('Type not found', type)
    }
  }
};

export default FieldFactory;