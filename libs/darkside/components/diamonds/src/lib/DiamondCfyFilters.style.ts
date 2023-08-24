import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyFilters = styled.div`
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
`;

export { StyledDiamondCfyFilters };

export default StyledDiamondCfyFilters;
