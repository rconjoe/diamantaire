import styled from 'styled-components';

const StyledDiamond360 = styled.div`
  display: block;
  aspect-ratio: 1/1;
  position: relative;
  border: 0.1rem solid transparent;
  overflow: hidden;
  background: var(--color-lightest-grey);

  > div {
    transform: scale(1.05);
  }

  .diamond-image-only {
    display: block;
    margin: auto;
    width: 100%;
    max-height: 100%;
    transform: scale(0.9);

    @media (min-width: ${({ theme }) => theme.sizes.desktop}) {
      transform: scale(0.75);
      width: auto;
      max-width: 17rem;
    }
  }

  .spritespin-progress-label {
    padding: 1rem;
    border-radius: 0.5rem;
    background: rgba(0, 0, 0, 0.25);
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .caption {
    font-size: var(--font-size-xxxsmall);
    position: absolute;
    color: var(--color-black);
    display: block;
    bottom: 1rem;
    left: 2rem;

    @media (max-width: ${({ theme }) => theme.sizes.tabel}) {
      padding: 0 8rem 0 2.4rem;
      left: 1rem;
    }
  }
`;

export default StyledDiamond360;

export { StyledDiamond360 };
