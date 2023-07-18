import { MAIN_FONT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondDetailIconList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

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
      width: 15px;
      transform: translate(0, 2px);
      margin-right: 15px;
    }
  }

  .waranty-link {
    .icon {
      width: 13px;
      margin-left: 1px;
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
    border: 1px solid var(--color-teal);
    height: 12px;
    width: 12px;
    margin-left: 6px;

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
