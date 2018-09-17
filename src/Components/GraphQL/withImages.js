import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const ImageUpdateQuery = gql`
    mutation UpdateImage($id: String!, $name: String!, $url: String!) {
        updateImage(id: $id, name: $name, url: $url) {
            name
        }
    }
`;

export const ImageDeleteQuery = gql`
  mutation DeleteImages($ids: [String]!) {
      deleteImages(ids: $ids) {
          name
      }
  }
`;

const withImageQuery = gql`
    query Image($id: ID!) {
        image(id: $id) {
            id
            name
            url
        }
    }
`;

export const withImage = withQuery(withImageQuery);

export default withQuery(gql`
    {
        images {
            id
            name
            url
        }
    }
`);
