import { gql } from 'graphql-request';

const imageFragment = gql`
  fragment image on Image {
    url
    altText
    width
    height
  }
`;

export default imageFragment;
