import styled from 'styled-components';

const StyledDiamondCfyFilterShape = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    display: block;
    text-align: center;
    line-height: 1.1;
    font-size: var(--font-size-xxxsmall);
    margin: 2rem auto 1rem;

    @media (min-width: ${({ theme }) => theme.sizes.tablet}) {
      font-size: var(--font-size-xsmall);
    }
  }

  .subtitle {
    width: 100%;
    display: block;
    text-align: center;
    margin: 0 0 1rem;

    p {
      margin: 0;
      font-size: var(--font-size-xxsmall);
      font-weight: var(--font-weight-normal);
    }

    a {
      color: var(--color-teal);
      transition: all 0.2s ease;
      font-weight: var(--font-weight-medium);

      &:hover {
        opacity: 0.75;
      }
    }
  }

  .box {
    background: var(--color-lightest-grey);
    padding: 0 0 1rem;
  }

  .lists {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .list {
    width: 100%;
    max-width: 50rem;
    flex-wrap: wrap;
    display: flex;
    padding: 1.5rem;
    gap: 1rem 0;
  }

  .list-item {
    display: flex;
    flex-direction: column;
    width: calc(100% / 5);
    gap: 1rem;
    cursor: pointer;
  }

  .list-item .name {
    display: block;
    text-align: center;
    margin: 0 auto;
    max-width: 7.9rem;
    font-size: var(--font-size-xxxsmall);
    line-height: 1;
  }

  .list-item .icon {
    display: flex;
    justify-content: center;
  }

  svg {
    height: auto;
    width: 100%;
    max-height: 3.5rem;
  }

  .cta {
    display: flex;
    justify-content: center;
    margin: 1rem 0 3rem;

    button {
      font-size: var(--font-size-xxsmall);
    }
  }
`;

export { StyledDiamondCfyFilterShape };

export default StyledDiamondCfyFilterShape;
