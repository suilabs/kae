import React from 'react';
import { Query } from "react-apollo";

const withQuery = (query) => (Component) => (props) => {
  return (
    <Query
      query={query}
      variables={props.variables}
    >
      {(pp) => {
        const {loading, error, data} = pp;
        if (loading) return <p className="loading">loading<span>.</span><span>.</span><span>.</span></p>;
        if (error) {
          console.log(error);
          return <p> error </p>;
        }
        return <Component data={data} {...props} />
      }}
    </Query>
  );
}

export default withQuery;
