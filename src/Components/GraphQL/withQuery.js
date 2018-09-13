import React from 'react';
import { Query } from "react-apollo";

const withQuery = (query) => (Component, refetch) => (props) => (
  <Query
    query={query}
    fetchPolicy={refetch ? 'cache-and-network': 'cache-first'}
  >
    {(pp) => {
      const { loading, error, data } = pp;
      if (loading) return <p className="loading">loading<span>.</span><span>.</span><span>.</span></p>;
      if (error) return <p> {error} </p>;
      return <Component data={data} {...props} />
    }}
  </Query>
);

export default withQuery;
