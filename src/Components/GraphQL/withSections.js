import { gql } from 'apollo-boost';
import withQuery from './withQuery';

const SECTIONS_QUERY = gql`
    {
        sections {
            id
            name
        }
    }
`;

export default withQuery(SECTIONS_QUERY);
