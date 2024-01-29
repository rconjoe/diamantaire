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
    width: 55rem;
  }

  p,
  p * {
    text-align: center;
    font-size: var(--font-size-xxsmall);

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      font-size: var(--font-size-xsmall);
    }
  }

  .cta {
    display: block;
    width: 26rem;
    margin: 0 auto;
  }

  button {
    background: var(--color-black) !important;
    color: var(--color-white) !important;
  }
`;

export { StyledDiamondTableCfyPromoCard };

export default StyledDiamondTableCfyPromoCard;
