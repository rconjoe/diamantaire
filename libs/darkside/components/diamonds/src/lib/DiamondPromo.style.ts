import { GREY_LIGHTEST, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondPromo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 0 0 20px;

  ${tabletAndUp(`
    margin: 20px 0 0;
  `)}

  .banner {
    display: block;
    padding: 20px 0;
    margin: 0;
  }

  .title {
    padding: 0;
    margin: 0 0 15px;
    font-size: var(--font-size-xsmall);
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
        font-size: var(--font-size-xsmall);
      }

      p {
        font-size: var(--font-size-xxsmall);
      }
    }
  }

  .leo {
    display: block;
    padding: 20px;
    text-align: center;

    ${tabletAndUp(`
      background: ${GREY_LIGHTEST};
    `)}

    h2 {
      font-size: var(--font-size-xsmall);
      font-weight: var(--font-weight-normal);
    }

    p {
      font-size: var(--font-size-xxsmall);
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
