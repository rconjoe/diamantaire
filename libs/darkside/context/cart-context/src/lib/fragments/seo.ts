import { gql } from 'graphql-request';

const seoFragment = gql`
  fragment seo on SEO {
    description
    title
  }
`;

export default seoFragment;
