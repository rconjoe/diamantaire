import styled from 'styled-components';

const StyledDiamondDetailSpecs = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-size: var(--font-size-small);
    font-weight: 500;
    text-align: left;
    margin-top: 3rem;

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      font-size: var(--font-size-xsmall);
      margin-top: 0px;
    }
  }

  .spec-list {
    display: flex;
    flex-direction: column;
    margin: 0.5rem 0 0;
  }

  .spec-label {
    font-size: var(--font-size-xxsmall);
    font-weight: var(--font-weight-medium);
    padding: 0.5rem;
  }

  .spec-value {
    font-size: var(--font-size-xxsmall);
    line-height: 1.2;
    padding: 0.5rem;
  }

  .spec-row {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 1rem;
    background: var(--color-white);

    &:nth-child(2n) {
      background: var(--color-white);
    }
  }
`;

export default StyledDiamondDetailSpecs;

export { StyledDiamondDetailSpecs };
