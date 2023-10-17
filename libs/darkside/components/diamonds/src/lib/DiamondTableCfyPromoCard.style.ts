import { BLACK, WHITE, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondTableCfyPromoCard = styled.div`
  display: block;
  padding: 0 0 2rem;

  .vo-table-foot & {
    background: #f0eaea;
    margin: 0 -2rem;
    width: 100%;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 2rem 0;
    gap: 2rem;
  }

  p {
    max-width: 100%;
    width: 550px;
  }

  p,
  p * {
    text-align: center;
    font-size: var(--font-size-xxsmall);

    ${tabletAndUp(`
      font-size: var(--font-size-xsmall);
    `)}
  }

  .cta {
    display: block;
    width: 260px;
    margin: 0 auto;
  }

  button {
    background: ${BLACK} !important;
    color: ${WHITE} !important;
  }
`;

export { StyledDiamondTableCfyPromoCard };

export default StyledDiamondTableCfyPromoCard;
