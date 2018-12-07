import PropTypes from 'prop-types';

const propTypes = {
  string: PropTypes.string,
  url: PropTypes.string,
  tags: PropTypes.string,
  image: PropTypes.string,
  range: PropTypes.number,
};

export const withPropTypesFromConfig = (Component) => {
  const { propConfig } = Component;
  Component.propTypes = {};
  Object.entries(propConfig).forEach(([key, value]) => {
    Component.propTypes = propTypes[value.split];
  });
  return Component;
};

export const CreateComponent = (id, displayName, config, renderFunction) => {
  const func = renderFunction;
  func.id = id;
  func.displayName = displayName;
  func.propConfig = config;
  config = {
    id,
    displayName,
    props: config
  };
  return {
    [id]: func,
    config,
  };
};