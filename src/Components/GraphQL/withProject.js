import React from 'react';
import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const PROJECT_QUERY = gql`
    query Project($id: ID!){
        project(id: $id) {
            id
            url
            name
            cover {
                name
                url
            }
            description
            type {
                id
                name
            }
            section {
                id
                name
            }
            template {
                id
                name
                rows {
                  id
                  name
                  type
                }              
            }
            configuration {
              component {
                id
              }
              value
            }
        }
    }
`;

const withProject = withQuery(PROJECT_QUERY);

export default withProject;
