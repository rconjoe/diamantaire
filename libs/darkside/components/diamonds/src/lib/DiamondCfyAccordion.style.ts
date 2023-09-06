import { tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyAccordion = styled.div`
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
`;

export { StyledDiamondCfyAccordion };

export default StyledDiamondCfyAccordion;
