import React from 'react';
import {CreateComponent, withPropTypesFromConfig} from './helper';

const component = CreateComponent(
  'paragraf',
  'Paragraf',
  {
    text: { type: 'string', label: 'Text'},
    width: { type: 'range', min: 0, max: 100, step: 10, label: 'Width'}
  },
  () => {},
);

export const ParagrafConfig = component.config;

export default withPropTypesFromConfig(component.paragraf);