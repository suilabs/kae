import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const PROJECT_QUERY = gql`
    query Project($id: ID!){
        project(id: $id) {
            id
            url
            name
            status
            cover {
                name
                url
                thumbnailUrl
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
            configuration {
              componentId
              propsJson
            }
            languages
            date
        }
    }
`;

const withProject = withQuery(PROJECT_QUERY);

export default withProject;
