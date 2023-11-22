import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const pageGap = '2rem';

const StyledWishlistPage = styled.div`
  .page-row {
    width: 100%;
    display: flex;
    flex-direction: column;

    ${tabletAndUp(`
    gap: ${pageGap};
    flex-direction: row;  
  `)}
  }

  .page-title {
    display: block;
    width: 100%;
    text-align: center;
    margin: 2rem 0;

    * {
      font-size: var(--font-size-medium);
      font-weight: var(--font-weight-medium);

      ${tabletAndUp(`
        font-size: var(--font-size-large);
      `)};
    }

    p {
      font-size: var(--font-size-xxsmall);
      font-weight: var(--font-weight-normal);

      ${tabletAndUp(`
        font-size: var(--font-size-xsmall);
      `)}
    }
  }
`;

export default StyledWishlistPage;

export { StyledWishlistPage };
