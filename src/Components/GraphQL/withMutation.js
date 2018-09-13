import React from 'react';
import { Mutation } from 'react-apollo';

const withMutation = (mutationQuery) => (renderFunction) => (props) => {
  return (
    <Mutation mutation={mutationQuery} onCompleted={props.onCompleted} onError={props.onError}>
      {(func) => renderFunction(func)}
    </Mutation>
  );
};

export default withMutation;
