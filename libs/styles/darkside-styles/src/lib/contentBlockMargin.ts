import { css } from 'styled-components';

import { media } from './mediaQueriesNew';

export const contentBlockMargin = css`
  margin: auto;
  margin-bottom: 2rem;

  ${media.small`
    margin-bottom: 4rem;
  `}
`;
