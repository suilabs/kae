import { gql } from 'apollo-boost';
import withQuery from './withQuery';

const PROJECTTYPES_QUERY = gql`
    {
        projectTypes {
            id
            name
        }
    }
`;

export default withQuery(PROJECTTYPES_QUERY);
