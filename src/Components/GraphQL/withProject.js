import React from 'react';
import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const PROJECT_QUERY = gql`
    query Project($id: ID!){
        project(id: $id) {
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


// const withProject = (Component, refetch) => withRouter((props) => {
//   return (
//   <Query
//     query={PROJECT_QUERY}
//     fetchPolicy={refetch ? 'cache-and-network': 'cache-first'}
//     variables={{
//         id: props.match.params.id
//     }}
//   >
//     {(pp) => {
//       const { loading, error, data } = pp;
//       if (loading) return <p className="loading">loading<span>.</span><span>.</span><span>.</span></p>;
//       if (error) {
//           console.log(error);
//           return <p> error </p>;
//       }
//       return <Component data={data} {...props} />
//     }}
//   </Query>
// );
// });


const withProject = withQuery(PROJECT_QUERY);

export default withProject;
