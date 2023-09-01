import styled from 'styled-components';

const StyledDiamondCfyBreadCrumb = styled.div`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 2rem auto 0;

  &:empty {
    display: none;
  }

  .breadcrumb {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .row {
    display: flex;
    justify-content: space-between;
  }

  .info {
    display: flex;
    gap: 5px;
  }

  .text {
    display: flex;
    gap: 4px;
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
    transform: translate(0, 5px);
  }

  .react-tooltip {
    font-size: var(--font-size-xxxsmall);
  }
`;

export default StyledDiamondCfyBreadCrumb;
