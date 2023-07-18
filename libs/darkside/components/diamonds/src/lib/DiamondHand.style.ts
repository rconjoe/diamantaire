import { GREY_LIGHTER } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondHand = styled.div`
  .media {
    position: relative;
    border: 1px solid ${GREY_LIGHTER};
  }

  .slider {
    margin: 20px 0 0;
    padding: 0 50px;

    .slider-hand {
      padding: 0;
    }

    .vo-slider-value-start,
    .vo-slider-value-end {
      transform: translate(0, 10px);
    }

    .vo-slider-values {
      margin: 0 -50px;
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
