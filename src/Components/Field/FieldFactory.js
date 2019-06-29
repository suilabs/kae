import React from 'react';

import { TagConfig, HeroImageConfig, ImageConfig, ParagraphConfig, TitleConfig } from '../../ComponentsLib';
import { InputField, ImageSelectorBox, LongInputField, RangeInput, ColorInput } from '../Form';

import './FieldFactory.css';

export const components = [HeroImageConfig, TagConfig, ImageConfig, ParagraphConfig, TitleConfig];

const FieldFactory = {
  renderField(componentId, props, onChange) {
    const compt = components.filter(c => c.id === componentId)[0];
    if (!compt) {
      return <p>Component {componentId} not found</p>;
    }
    return (
      <div className='sui-template-component--wrapper'>
        <h3>{compt.displayName}</h3>
        { Object.entries(compt.config).map(([key, value]) => {
          switch (value.type) {
            case 'string':
            case 'url':
              return <InputField id={key} name={value.label} onChange={onChange} value={props[key]} />;
            case 'image':
              return <ImageSelectorBox className='sui-template-component__field' id={key} src={(props[key] || {}).url} onChange={onChange} />;
            case 'tags':
              return <InputField id={key} name={value.label} onChange={onChange} value={props[key]} />;
            case 'paragraph':
              return <LongInputField id={key} name={value.label} onChange={onChange} value={props[key]} />;
            case 'range':
              return <RangeInput
                id={key}
                config={value}
                value={props[key]}
                onChange={onChange}
              />;
            case 'color':
              return <ColorInput
                id={key}
                name={value.label}
                value={props[key]}
                onChange={onChange}
              />;
            default:
              return <div>UNIMPLEMENTED {key}</div>
          }
        }) }
      </div>
    )
  }
};

export default FieldFactory;
