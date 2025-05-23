import { tabletAndUp, desktopAndUp, BOLD_WEIGHT } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const VideoSlideContainer = styled.div`
  display: flex;
  flex-direction: column;

  video {
    object-fit: cover;
  }

  > a:hover .list-item__media--hover {
    opacity: 1;
  }

  > .container {
    padding: 0;
  }

  .list-item__media {
    display: block;
    max-width: 100%;
    position: relative;

    .lazyload-placeholder {
      position: absolute !important;
      height: 100% !important;
      width: 100% !important;
      left: 0;
      top: 0;
    }
  }

  .list-item__media--hover {
    transition: all 0.25s ease;
    display: none;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    padding-top: 100%;

    ${desktopAndUp(`
      display: block;
    `)}
  }

  .list-item__copy {
    display: block;
    text-align: left;
    margin: 2rem 0 0;
  }

  .list-item__copy-title {
    color: #000;
    display: block;
    font-size: 1.5rem;
    font-weight: ${BOLD_WEIGHT};

    ${tabletAndUp(`
    font-size: 1.8rem;
    line-height: 2.2rem;
    letter-spacing: 0.03rem;
  `)};
  }
`;
