import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCelebrityReelRowStyles = styled.div`
  padding: var(--gutter) 0;
  .title-container {
    text-align: center;
    padding-bottom: 20px;
  }
  .celeb-container {
    display: flex;

    > * {
      flex: 0 0 250px;
      margin-right: 20px;
      &:last-child {
        margin-right: 0px;
      }
      ${media.small`flex: 0 0 20%; margin-right: 0px;`}
    }
  }
  .cta-container {
    max-width: 300px;
    margin: 0 auto;
  }
`;
