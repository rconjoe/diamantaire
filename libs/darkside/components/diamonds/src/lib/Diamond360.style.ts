import styled from 'styled-components';

const StyledDiamond360 = styled.div`
  display: block;
  aspect-ratio: 1/1;
  position: relative;
  border: 0.1rem solid transparent;
  overflow: hidden;
  background: var(--color-lightest-grey);

  .img {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .vid {
    transform: scale(1.025);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
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
