import styled from 'styled-components';

const StyledDiamondHand = styled.div`
  position: relative;
  aspect-ratio: 1/1;

  .media {
    position: relative;
    aspect-ratio: 1/1;
  }

  .slider {
    margin: 3rem auto 2rem;
    padding: 0 5rem;
    max-width: 450px;

    .slider-hand {
      padding: 0;
    }

    .vo-slider-value-start,
    .vo-slider-value-end {
      transform: translate(0, 1rem);
    }

    .vo-slider-values {
      margin: 0 -5rem;
    }

    .vo-slider-tooltip,
    .vo-slider-value-start,
    .vo-slider-value-end {
      font-size: var(--font-size-xxxsmall);
    }
  }

  .image-hand {
    display: block;
    aspect-ratio: 1/1;
    position: relative;
    margin: 0 auto;
  }

  .image-diamond {
    position: absolute;
    top: 58%;
    left: 20.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 25%;
  }

  .image-caption {
    text-align: center;
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;

    * {
      font-size: var(--font-size-xxsmall);
    }
  }
`;

export default StyledDiamondHand;

export { StyledDiamondHand };
