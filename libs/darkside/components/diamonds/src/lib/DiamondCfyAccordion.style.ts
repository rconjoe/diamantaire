import { GREY_LIGHTER, GREY_LIGHTEST, desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyAccordion = styled.div`
  border-top: 1px solid ${GREY_LIGHTER};
  margin: 2rem 0 0;

  ${desktopAndUp(`
    border-top: 0;
    margin: 0;
  `)}

  .accordion-header {
    .text {
      font-size: var(--font-size-xxxsmall);

      ${desktopAndUp(`
        font-size: var(--font-size-xsmall);
      `)}
    }
  }

  .accordion-row {
    .row {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 2rem 0;
      gap: 1rem;

      ${tabletAndUp(`
        gap: 2rem;
      `)}
    }
  }

  .description {
    p {
      font-size: var(--font-size-xxsmall);
    }

    img {
      max-width: 35rem;
    }
  }

  .accordion-row.color {
    .description {
      margin-top: -2rem;
    }

    img {
      margin-bottom: 1rem;
    }
  }

  .upgrade {
    background: ${GREY_LIGHTEST};
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 0;

    * {
      font-size: var(--font-size-xxsmall) !important;
    }

    form {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input {
      cursor: pointer;
      margin: 0 1.25rem 0 0;
    }
  }
`;

export { StyledDiamondCfyAccordion };

export default StyledDiamondCfyAccordion;
