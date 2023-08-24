import { mobileOnly, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

const StyledDiamondCfyAsidePromo = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0eaea;
  padding: 20px 10px 40px;
  margin: 0;
  width: 100%;

  ${tabletAndUp(`
    padding: 30px 30px 50px;
  `)}

  .section-title {
    font-size: var(--font-size-xsmall);
    font-weight: var(--font-weight-medium);
    line-height: 1.1;
    text-align: center;
    margin: 0 0 20px;

    ${tabletAndUp(`
      font-size: var(--font-size-small);
      margin: 0 0 25px;
    `)}
  }

  .blocks {
    display: flex;
    flex-direction: column;
    gap: 40px;

    > div {
      text-align: left;
      margin: 0;

      > div {
        ${mobileOnly(`
          margin: 0 !important;
        `)}
      }
    }

    p {
      font-size: var(--font-size-xxsmall);
      margin-top: 0.5rem !important;
      margin-bottom: 2rem !important;

      ${tabletAndUp(`
        margin-top: 0.5rem !important;
        margin-bottom: 0.5rem !important;
      `)}
    }

    .video-wrapper {
      padding: 0;
      margin: 0;
    }

    .leo {
      text-align: center;

      h3 {
        font-weight: var(--font-weight-normal);
      }

      .media {
        max-width: 13rem;
        margin: auto !important;
      }

      > div:not(.media) {
        ${mobileOnly(`
          margin: 1.5rem auto !important;
          width: 25rem;
          text-align: left;
          display: block;
        `)}
      }
    }
  }
`;

export default StyledDiamondCfyAsidePromo;

export { StyledDiamondCfyAsidePromo };
