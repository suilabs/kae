import React from 'react';
import { withPropTypesFromConfig, CreateComponent } from './helper';

const component = CreateComponent(
  'heroImage',
  'Hero Image',
  {
    image: { type: 'image', label: 'Image' },
    alt: { type: 'string', label: 'Alt text' },
  },
  (props) => (
    <img
      className='sui6-component-heroImage'
      alt={props.alt}
      src={props.src}
    />
  ),
);

export const HeroImageConfig = component.config;

export default withPropTypesFromConfig(component.heroImage);