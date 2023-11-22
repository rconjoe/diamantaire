import { MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondDetailIconList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  .icon-list-item {
    display: flex;
    align-items: center;

    a {
      display: flex;
      align-items: center;
    }

    p {
      font-size: var(--font-size-xxsmall);
    }

    .icon {
      width: 1.5rem;
      transform: translate(0, 0.2rem);
      margin-right: 1.5rem;
    }
  }

  .waranty-link {
    .icon {
      width: 1.3rem;
      margin-left: 0.1rem;
    }

    p {
      color: var(--color-teal);
      text-decoration: underline;
    }
  }

  .slideout-trigger {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    border: 0.1rem solid var(--color-teal);
    height: 1.2rem;
    width: 1.2rem;
    margin-left: 0.6rem;

    * {
      font-size: var(--font-size-xxxxxsmall);
      font-family: ${MAIN_FONT};
      text-transform: none;
      color: var(--color-teal);
    }
  }

  .slideout {
    .title {
      display: block;

      * {
        font-size: var(--font-size-small);
      }
    }

    .body {
      display: block;

      * {
        font-size: var(--font-size-xxsmall);
      }

      h2 {
        font-size: var(--font-size-xsmall) !important;
      }
    }
  }
`;

export { StyledDiamondDetailIconList };

export default StyledDiamondDetailIconList;
