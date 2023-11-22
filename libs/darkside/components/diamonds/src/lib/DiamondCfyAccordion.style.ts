import { desktopAndUp, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyAccordion = styled.div`
  border-top: 0.1rem solid var(--color-lighter-grey);
  margin: 2rem 0 0;

  ${desktopAndUp(`
    border-top: 0;
    margin: 0;
  `)}

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
    background: var(--color-lightest-grey);
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    margin: 2rem 0 0;

    * {
      font-size: var(--font-size-xxsmall) !important;
    }

    form {
      display: flex;
      align-items: center;
      gap: 1rem;

      .price {
        margin: 0 0 0 1rem;
        display: flex;
        gap: 0.25rem;
        align-items: center;

        i {
          font-style: normal;
        }
      }
    }

    input {
      cursor: pointer;
      margin: 0 0 0 0;
    }
  }
`;

export { StyledDiamondCfyAccordion };

export default StyledDiamondCfyAccordion;
