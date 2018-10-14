import React from 'react';
import { withRouter } from 'react-router-dom';

export default (Component) => withRouter((props) =>
  <Component
    variables={{
      id: props.match.params.id,
    }}
  />
);
