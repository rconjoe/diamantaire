import { BLACK, WHITE, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondTableCfyPromoCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  gap: 2rem;

  p {
    max-width: 500px;
  }
  p,
  p * {
    text-align: center;
    font-size: var(--font-size-xxsmall);

    ${tabletAndUp(`
      font-size: var(--font-size-xsmall);
    `)}
  }
  button {
    background: ${BLACK} !important;
    color: ${WHITE} !important;
  }
`;

export { StyledDiamondTableCfyPromoCard };

export default StyledDiamondTableCfyPromoCard;
