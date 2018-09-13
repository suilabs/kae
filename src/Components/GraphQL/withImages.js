import { gql } from 'apollo-boost';
import { withRouter } from 'react-router-dom';
import withQuery from "./withQuery";
import withMutation from './withMutation';

export const withImageMutation = withMutation(gql`
    mutation UpdateImage($id: String!, $name: String!, $url: String!) {
        updateImage(id: $id, name: $name, url: $url) {
            name
        }
    }
`);

export const withImage = withRouter(({ match }) => {
    return withQuery(gql`
      image(${match.params.id})
    `)
});

export default withQuery(gql`
    {
        images {
            id
            name
            url
        }
    }
`);
