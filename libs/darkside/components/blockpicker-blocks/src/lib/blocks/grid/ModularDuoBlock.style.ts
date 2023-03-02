import { setSpace, mobileOnly, tabletAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const ModularDuoBlockContainer = styled.div`
  .mod-duo__container {
    position: relative;
    padding: ${setSpace(4)} 0 !important;

    &.with-swiper {
      ${mobileOnly(`
        padding: ${setSpace(4)} 0 calc(${setSpace(4)} - 20px) !important;
      `)}
    }

    &.with-swiper:after {
      ${mobileOnly(`
        content: '';
        width: 100%;
        height: ${setSpace(4)};
        background: #fff;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
      `)};
    }
  }

  .mod-duo__title {
    display: block;
    text-align: center;
    padding: 0 ${setSpace(4)};
  }

  .mod-duo__blurb {
    display: block;
    text-align: center;
    max-width: 100%;
    width: 700px;
    margin: ${setSpace(4)} auto 0;
    padding: 0 ${setSpace(4)};
  }

  .mod-duo__with-swiper {
    display: block;
    position: relative;
    .with-swiper & {
      overflow: auto;
    }
  }

  .mod-duo__media {
    margin: ${setSpace(4)} auto 0;
    max-width: 1024px;
    position: relative;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 0;
    grid-column-gap: ${setSpace(1)};
    display: grid;

    ${tabletAndUp(`
      grid-column-gap: ${setSpace(2)};
    `)};

    > div {
      padding: 0;
    }

    a {
      display: block;
      font-size: 0;
    }

    a img {
      display: block;
    }

    .imageTileCopyContainer:empty {
      display: none;
    }

    .with-swiper & {
      ${mobileOnly(`
        white-space: nowrap;
        width: 150%;
        padding-bottom: 20px;
      `)}
    }
  }
`;
