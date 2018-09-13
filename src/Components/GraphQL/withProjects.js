import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const PROJECTS_QUERY = gql`
    {
        projects {
            id
            name
            cover {
                name
                url
            }
        }
    }
`;

export default withQuery(PROJECTS_QUERY);
