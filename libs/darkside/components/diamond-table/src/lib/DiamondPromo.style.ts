import { FONT_SIZE_5, FONT_SIZE_6, GREY_LIGHTEST } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondPromo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0 0;

  .banner {
    display: block;
    border: 1px solid ${GREY_LIGHTEST};
    background: ${GREY_LIGHTEST};
    padding: 20px;
    margin: 0;
  }

  .title {
    padding: 0;
    margin: 0 0 15px;
    font-size: ${FONT_SIZE_5};
    font-weight: 500;
  }

  .list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    list-style-position: inside;
    flex-direction: column;
    display: flex;
    gap: 10px;

    li {
      padding: 0;
      width: 100%;

      h3 {
        font-size: ${FONT_SIZE_5};
      }

      p {
        font-size: ${FONT_SIZE_6};
      }
    }
  }

  .leo {
    display: block;
    background: ${GREY_LIGHTEST};
    padding: 20px;
    text-align: center;

    h2 {
      font-size: ${FONT_SIZE_5};
    }

    p {
      font-size: ${FONT_SIZE_6};
    }

    .media {
      width: 120px;
      display: block;
      margin: 15px auto 0;
      position: relative;
    }
  }
`;

export default StyledDiamondPromo;

export { StyledDiamondPromo };
