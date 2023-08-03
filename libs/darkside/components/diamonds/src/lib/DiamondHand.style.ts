import styled from 'styled-components';

const StyledDiamondHand = styled.div`
  .media {
    position: relative;
  }

  .slider {
    margin: 3rem 0 0;
    padding: 0 5rem;

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
  }

  .image-hand {
    display: block;
    aspect-ratio: 1/1;
    position: relative;
  }

  .image-diamond {
    position: absolute;
    top: 60%;
    left: 20.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 25%;
  }
`;

export default StyledDiamondHand;

export { StyledDiamondHand };
