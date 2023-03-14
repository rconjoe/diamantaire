import { GREY_LIGHTEST } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const SocialMediaContainer = styled.div`
  padding: 50px 25px;
  background-color: ${GREY_LIGHTEST};

  @media (min-width: 1200px) {
    padding: 80px 25px;
  }

  .title__container {
    text-align: center;
    margin-bottom: 20px;

    h2 {
      margin-bottom: 20px;
    }
  }

  .icons__container {
    text-align: center;
    ul {
      display: inline-flex;
      justify-content: center;
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        flex: 1;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
