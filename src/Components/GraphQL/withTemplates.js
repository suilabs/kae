import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export default withQuery(gql`
    {
        templates {
            id
            name
            rows {
                id
                name
                type
            }
        }
    }
`);