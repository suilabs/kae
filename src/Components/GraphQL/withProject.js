import React from 'react';
import { gql } from 'apollo-boost';
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import withQuery from "./withQuery";

export const PROJECT_QUERY = id => gql`
    {
        project(id: "${id}") {
            id
            name
            cover {
                name
                url
            }
            description
            textPool #change to layoutFields
            type {
                id
                name
            }
            section {
                id
                name
            }
        }
    }
`;

const withProject = (Component, refetch) => withRouter((props) => {
  return (
  <Query
    query={PROJECT_QUERY(props.match.params.id)}
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
})


export default withProject;
