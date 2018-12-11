import React from 'react';

import { TagConfig, HeroImageConfig, ImageConfig, ParagraphConfig } from '../../ComponentsLib';
import { InputField, ImageSelectorBox, LongInputField } from '../Form';
import {simulateEvent} from "../../Core/Utils";

import './FieldFactory.css';

export const components = [HeroImageConfig, TagConfig, ImageConfig, ParagraphConfig];

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
              props[key] = props[key] !== undefined ? props[key] : value.max;
              return (
                <div>
                  <label>{value.label}</label>
                  <input className='sui-template-component-range__input' id={key} type='text' name={key} value={props[key]} onChange={onChange}/>
                  <span>%</span>
                  <button
                    onClick={() => onChange(simulateEvent(key, Math.min(props[key] + value.step, value.max )))}
                  >
                    +
                  </button>
                  <button
                    onClick={() => onChange(simulateEvent(key, Math.max(props[key] - value.step, value.min )))}
                  >
                    -
                  </button>
                </div>
              )
          }
        }) }
      </div>
    )
  }
};

export default FieldFactory;