import { WHITE, desktopAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondDetailSpecs = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: var(--font-size-small);
    font-weight: 500;
    text-align: left;
    margin-top: 30px;

    ${desktopAndUp(`
      font-size: var(--font-size-xsmall);
      margin-top: 0px;
    `)}
  }

  .spec-list {
    display: flex;
    flex-direction: column;
    margin: 5px 0 0;
  }

  .spec-label {
    font-size: var(--font-size-xxsmall);
    font-weight: var(--font-weight-medium);
    padding: 5px;
  }

  .spec-value {
    font-size: var(--font-size-xxsmall);
    line-height: 1.2;
    padding: 5px;
  }

  .spec-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 10px;
    background: ${WHITE};

    &:nth-child(2n) {
      background: ${WHITE};
    }
  }
`;

export default StyledDiamondDetailSpecs;

export { StyledDiamondDetailSpecs };
