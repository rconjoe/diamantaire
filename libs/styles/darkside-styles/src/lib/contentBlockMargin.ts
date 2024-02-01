import { css } from 'styled-components';

import { XXLDesktopAndUp } from './mediaQueries';

export const contentBlockMargin = css`
  margin: auto;
  margin-bottom: 4rem;
`;

export const pageMargin = css`
  margin-left: var(--margin-gutter);
  margin-right: var(--margin-gutter);
`;

export const contentBlockTitle = css`
  font-weight: 400 !important;
  font-size: 3.2rem;

  ${XXLDesktopAndUp(`
      font-size: 4.2rem;
    `)}
`;
