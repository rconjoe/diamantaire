import { desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyBreadCrumb = styled.div`
  display: block;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;

  .breadcrumb {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 2rem 0 0;
    padding: 0 2.4rem;

    ${desktopAndUp(`
    padding:0;
    `)}

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
