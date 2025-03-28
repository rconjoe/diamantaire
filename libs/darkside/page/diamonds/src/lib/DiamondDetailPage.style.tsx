import styled from 'styled-components';

const StyledDiamondDetailPage = styled.div`
  display: block;

  .page-title {
    display: block;
    padding: 2rem 0;

    .title {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-medium);
      text-align: center;
      line-height: 1.2;
      min-height: 2.2rem;
    }
  }

  .modular-banner-container {
    .full-width-image-container {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        min-height: auto;
        margin-bottom: 2rem;
      }
    }
    .text-container {
      @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
        max-width: 100% !important;
        margin: 0 auto 4rem;
      }
    }
  }
`;

export default StyledDiamondDetailPage;

export { StyledDiamondDetailPage };
