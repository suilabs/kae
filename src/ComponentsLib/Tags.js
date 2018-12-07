import React from 'react';
import {CreateComponent, withPropTypesFromConfig} from './helper';

const component = CreateComponent(
  'tags',
  'Tags',
  {
    tags: { type: 'tags', label: 'Project Tags'}
  },
  () => {},
);

export const TagsConfig = component.config;

export default withPropTypesFromConfig(component.tags);