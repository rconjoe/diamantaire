import {
  setSpace,
  tabletAndUp,
  XXLDesktopAndUp,
  desktopAndUp,
  makeTealLink,
  media,
} from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularSkinnyBannerBlockContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 144rem;
  margin: 0 auto;

  .skinny-banner__image-container {
    width: 100%;
    max-width: 144rem;
    height: auto;
    min-height: calc(100vw / 375 * 180);
    ${tabletAndUp(`
    min-height: calc(100vw / 1440 * 338);
  `)};
    ${XXLDesktopAndUp(`
    min-height: 338px;
  `)};
  }

  .skinny-banner__title-copy-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: ${setSpace(2.5)} auto;
    text-align: center;
    max-width: ${setSpace(40)};

    ${media.small`
      color: ${(props) => props.$textColor};
      margin: 0 auto;
      text-align: left;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: ${setSpace(15)};

      // additional class
      &.-center-copy {
        left: 0;
        right: 0;
        text-align: center;
      }
      &.-center-bottom {
        left: 0 !important;
        right: 0 !important;
        text-align: center !important;
        top: 85% !important;
      }
    
    `}

    ${desktopAndUp(`
      max-width: ${setSpace(59)};
    `)}
  }

  .skinny-banner__title {
    margin-bottom: ${setSpace(2)};

    ${tabletAndUp(`
      &.-center-bottom {
        margin-bottom: 1rem !important;
      }
      margin-bottom: ${setSpace(2.5)};
    `)};
  }
  .skinny-banner__subtitle {
    ${tabletAndUp(`
      max-width: ${setSpace(63)};
      padding-bottom: ${setSpace(2.5)};
      margin: unset;
    `)};
  }

  .skinny-banner__cta {
    ${makeTealLink()};
    margin: ${setSpace(2.5)} 0;

    ${tabletAndUp(`
      color: var(--color-white);
      margin-top ${setSpace(0.5)}
  `)};
  }
`;
