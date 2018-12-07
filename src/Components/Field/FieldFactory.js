import React from 'react';

import { HeroImageConfig } from '../../ComponentsLib/HeroImage';
import { TagsConfig } from '../../ComponentsLib/Tags';
import { ParagrafConfig } from '../../ComponentsLib/Paragraf';
import { simulateEvent } from '../../Core/Utils';
import { InputField, ImageSelectorBox} from '../Form';

export const components = [HeroImageConfig, TagsConfig, ParagrafConfig];

const FieldFactory = {
  renderField(componentId, props, onChange) {
    const compt = components.filter(c => c.id === componentId)[0];
    if (!compt) {
      return <p>Component {componentId} not found</p>;
    }
    return (
      <div className='sui-template-component--wrapper'>
        <p>{compt.displayName}</p>
        { Object.entries(compt.props).map(([key, value]) => {
          switch (value.type) {
            case 'string':
            case 'url':
              return <InputField id={key} name={value.label} onChange={onChange} value={props[key]} />;
            case 'image':
              return <ImageSelectorBox id={key} src={(props[key] || {}).url} onChange={onChange} />;
            case 'tags':
              return <InputField id={key} name={value.label} onChange={onChange} value={props[key]} />;
            case 'range':
              props[key] = props[key] !== undefined ? props[key] : value.max;
              return (
                <div>
                  <label>{value.label}</label>
                  <span>{props[key]} %</span>
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
    // switch(type) {
    //   case 'TEXT':
    //     return <InputField id={id} name={name} value={value} onChange={onChange} />;
    //   case 'IMAGE':
    //     return (
    //       <FieldsSection name={name}>
    //         <ImageSelectorBox id={id} value={value} onChange={onChange} />;
    //       </FieldsSection>
    //     );
    //   case 'ARRAY_IMAGE':
    //     return (
    //       <FieldsSection name={name}>
    //         <ImageStrip srcset={value ? value.split(';') : []} id={id} onChange={onChange} />
    //       </FieldsSection>
    //     );
    //   default:
    //     console.err('Type not found', type)
    // }
  }
};

export default FieldFactory;