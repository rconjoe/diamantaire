import { FONT_SIZE_4 } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondPage = styled.div`
  margin: 25px auto 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0 50px;

  .page-title {
    width: 100%;
    padding: 0 0 30px;
    display: flex;
    justify-content: flex-end;

    .title {
      font-size: ${FONT_SIZE_4};
      font-weight: 500;
      width: calc(100% - 450px);
      text-align: center;
      line-height: 30px;
    }
  }

  .page-aside {
    width: 400px;
    max-width: 100%;
    margin-top: -30px;

    position: sticky;
    align-self: flex-start;
    top: 155px;
  }
`;

export default StyledDiamondPage;

export { StyledDiamondPage };
