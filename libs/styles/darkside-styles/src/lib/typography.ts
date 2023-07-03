import { createGlobalStyle } from 'styled-components';

import * as mediaQueries from './mediaQueries';
import { setSpace } from './setSpace';

export const MAIN_FONT = 'futura-pt, sans-serif';

// hack for styled-components to have prettier formatting :)
const styled = { createGlobalStyle };

export const Typography = styled.createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  p,
  .p-copy,
  button,
  input,
  textarea,
  strong {
    letter-spacing: 0px;
    font-family: ${MAIN_FONT};
    font-style: normal;
    margin: 0;

    &.small {
      font-size: var(--font-size-xsmall);
    }
  }

  h1,
  .h1 {
    /* Main Headline */
    &.primary {
      font-weight: var(--font-weight-normal);
      font-size: 2.8rem;
      line-height: ${setSpace(4.5)};
      ${mediaQueries.tabletAndUp(`
          font-size: 4.2rem;
          line-height: ${setSpace(6)};
        `)};
    }

    /* PDP Product Name / Secondary content block headline */
    &.secondary {
      font-weight: var(--font-weight-medium);
      font-size: 2.2rem;
      line-height: ${setSpace(3.5)};
      ${mediaQueries.tabletAndUp(`
          font-size: 2.8rem;
          line-height: ${setSpace(4.5)};
        `)};
    }
  }

  h2,
  .h2 {
    &.primary {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-small);
      line-height: 1.3;
      ${mediaQueries.tabletAndUp(`
          font-size: 2rem;
        `)};
    }
    /* PLP product names  */
    &.secondary {
      font-weight: var(--font-weight-normal);
      font-size: 1.4rem;
      line-height: ${setSpace(2)};
      &.-medium {
        font-weight: var(--font-weight-medium);
      }
      &.-bold {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  h3,
  .h3 {
    /* Category headers */
    &.primary {
      font-weight: var(--font-weight-medium);
      font-size: 1.4rem;
      line-height: ${setSpace(2.5)};

      &.-bold {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  h4,
  .h4,
  .h5,
  strong,
  p {
    &.primary {
      font-weight: var(--font-weight-medium);
      font-size: 1.4rem;
      line-height: 1.5;
      &.-medium {
        font-weight: var(--font-weight-medium);
      }
      &.-bold {
        font-weight: var(--font-weight-bold);
      }
    }
    &.secondary {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-xsmall);
      line-height: 1.7;
      &.-medium {
        font-weight: var(--font-weight-medium);
      }
      &.-bold {
        font-weight: var(--font-weight-bold);
      }
    }
  }

  /* Body Copy */
  p,
  .p-copy {
    /* Body copy */
    font-weight: var(--font-weight-normal);
    font-size: 1.6rem;
    ${mediaQueries.tabletAndUp(`
        font-size: var(--font-size-xsmall);
      `)};
    line-height: 1.3;

    &.-medium {
      font-weight: var(--font-weight-medium);
    }

    &.-bold {
      font-weight: var(--font-weight-bold);
    }

    &.small {
      font-size: var(--font-size-xsmall);
    }
  }
`;
