import { gql } from 'apollo-boost';
import withQuery from "./withQuery";

export const ImageUpdateQuery = gql`
    mutation UpdateImage($id: String!, $name: String!, $url: String!) {
        updateImage(id: $id, name: $name, url: $url, filename: $filename) {
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

export const CreateImageQuery = gql`  
    mutation CreateImage($name: String!, $url: String!, $filename: String!) {
        insertImage(url: $url, name: $name, filename: $filename) {
            id
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
            filename
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
            filename
        }
    }
`);
