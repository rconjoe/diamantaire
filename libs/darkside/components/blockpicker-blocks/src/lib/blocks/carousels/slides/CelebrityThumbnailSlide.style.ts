import { desktopAndUp, setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const CelebrityThumbnailSlideContainer = styled.div`
  display: block;
  position: relative;
  min-height: 10rem;
  width: 100%;
  cursor: pointer;

  &.-reel {
    width: unset;
  }

  ${desktopAndUp(`
    min-height: 20rem;
  `)}

  .slide__image-container {
    max-height: 28rem;
    overflow: hidden;
    img {
      margin: 0 calc(${setSpace(1)} / 2);
    }
  }
`;
