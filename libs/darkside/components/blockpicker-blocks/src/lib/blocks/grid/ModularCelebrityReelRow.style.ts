import { media } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularCelebrityReelRowStyles = styled.div`
  padding: var(--gutter) 0;
  .title-container {
    text-align: center;
    padding-bottom: 2rem;
  }
  .celeb-container {
    display: flex;

    > * {
      flex: 0 0 25rem;
      margin-right: 2rem;
      &:last-child {
        margin-right: 0px;
      }
      ${media.small`flex: 0 0 20%; margin-right: 0px;`}
    }
  }
  .cta-container {
    max-width: 30rem;
    margin: 0 auto;
  }
`;
