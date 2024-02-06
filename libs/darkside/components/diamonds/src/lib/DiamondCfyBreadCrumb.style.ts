import styled from 'styled-components';

const StyledDiamondCfyBreadCrumb = styled.div`
  display: block;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  position: relative;
  z-index: 2;

  .breadcrumb {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 2rem 0 0;
    padding: 0 2.4rem;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      padding: 0;
    }

    &:empty {
      display: none;
    }
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .info {
    display: flex;
    gap: 0.5rem;
  }

  .text {
    display: flex;
    gap: 0.4rem;
    font-size: var(--font-size-xxxsmall);
  }

  .value {
    font-weight: var(--font-weight-bold);
  }

  .cta button {
    font-size: var(--font-size-xxxsmall);
  }

  .tooltip-trigger {
    font-size: var(--font-size-xxxsmall);
    transform: translate(0, 0.5rem);
  }

  .react-tooltip {
    font-size: var(--font-size-xxxsmall);
  }
`;

export default StyledDiamondCfyBreadCrumb;
