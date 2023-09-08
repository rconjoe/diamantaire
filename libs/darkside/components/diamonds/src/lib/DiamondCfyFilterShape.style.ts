import { GREY_LIGHTEST, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyFilterShape = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: block;
    text-align: center;
    line-height: 1.1;
    font-size: var(--font-size-xxxsmall);
    margin: 2.5rem auto;

    ${tabletAndUp(`
      font-size: var(--font-size-xsmall);
    `)}
  }

  .lists {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .list {
    width: 100%;
    max-width: 500px;
    flex-wrap: wrap;
    display: flex;
    padding: 1.5rem;
    gap: 1rem 0;
  }

  .list.popular {
    background: ${GREY_LIGHTEST};
  }

  .list .subtitle {
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    font-size: var(--font-size-xxxsmall);
    font-weight: var(--font-weight-normal);
    margin-top: -1rem;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    width: calc(100% / 6);
    gap: 1rem;
    cursor: pointer;
  }

  .list-item .name {
    display: block;
    text-align: center;
    margin: 0 auto;
    max-width: 79px;
    font-size: var(--font-size-xxxsmall);
    line-height: 1;
  }

  .list-item .icon {
    display: flex;
    justify-content: center;
  }

  svg {
    height: 35px;
  }

  .cta {
    display: flex;
    justify-content: center;
    margin-top: 1rem;

    button {
      font-size: var(--font-size-xxsmall);
    }
  }
`;

export { StyledDiamondCfyFilterShape };

export default StyledDiamondCfyFilterShape;
