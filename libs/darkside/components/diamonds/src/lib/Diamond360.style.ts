import styled from 'styled-components';

const StyledDiamond360 = styled.div`
  display: block;
  aspect-ratio: 1/1;
  position: relative;
  overflow: hidden;
  background: var(--color-lightest-grey);

  .img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    img {
      max-width: 40% !important;
      max-height: 100% !important;
      object-fit: contain !important;
    }
  }

  .vid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &.-fallback {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        object-fit: contain;
        max-width: 200px;
      }
    }
    > div > div,
    > div {
      position: absolute;
      top: 0;
      left: 0;
      width: 100% !important;
      height: 100% !important;
    }
  }

  .caption {
    font-size: var(--font-size-xxsmall);
    position: absolute;
    color: var(--color-black);
    display: block;
    bottom: 1rem;
    left: 2rem;
    z-index: 200;

    @media (max-width: ${({ theme }) => theme.sizes.tablet}) {
      padding: 0 8rem 0 2.4rem;
      left: 1rem;
    }
  }
`;

export default StyledDiamond360;

export { StyledDiamond360 };
