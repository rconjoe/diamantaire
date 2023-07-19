import { setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const JournalListEntryStyles = styled.div`
  .imageTileCopyContainer {
    > h2 {
      margin-top: ${setSpace(2)};
    }
    > p {
      margin-top: ${setSpace(1)};
    }
    > a {
      margin-top: ${setSpace(1)};
    }
  }
`;
