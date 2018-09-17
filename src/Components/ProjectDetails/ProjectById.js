import React from 'react';
import { withRouter } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';

export default withRouter((props) =>
  <ProjectDetails
    variables={{
      id: props.match.params.id,
    }}
  />
);
