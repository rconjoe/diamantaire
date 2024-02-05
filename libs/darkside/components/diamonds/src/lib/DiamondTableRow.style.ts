import styled from 'styled-components';

const gap = '2rem';

const mediaWidth = '375px';

const StyledDiamondTableRow = styled.div`
  display: block;
  flex-wrap: wrap;

  .row-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      flex-direction: row;
      gap: ${gap};
      padding: ${gap} 0;
    }
  }

  .row-media {
    width: 100%;
    display: flex;
    padding: 0;
    align-items: flex-start;

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      width: ${mediaWidth};
    }

    .row-media-content {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: center;
    }

    img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
    }

    .row-media-content {
      display: block;
      position: relative;
    }
  }

  .row-aside {
    display: flex;
    flex-direction: column;
    gap: ${gap};
    flex: 1;
    width: 100%;
    padding: ${gap};
    margin-bottom: ${gap};

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      padding: 0;
    }
  }

  .row-accordion {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
    padding: 0;
    order: 2;

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      order: 1;
      padding-right: ${gap};
    }
  }

  .row-cta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    gap: 1.5rem;
    order: 1;

    @media (min-width: ${({ theme }) => theme.sizes.xl}) {
      order: 2;
      padding: 0 ${gap} 0 0;
    }

    button {
      width: 100%;
      max-width: 360px;
    }

    .button-details button {
      font-size: var(--font-size-xxsmall);
      font-weight: 500;
      width: auto;
    }

    .button-expert button,
    .button-purchase button {
      font-weight: 500;
    }
  }
`;

export { StyledDiamondTableRow };

export default StyledDiamondTableRow;
