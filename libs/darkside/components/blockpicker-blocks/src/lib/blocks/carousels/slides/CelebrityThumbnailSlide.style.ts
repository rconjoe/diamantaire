import { desktopAndUp, setSpace } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const CelebrityThumbnailSlideContainer = styled.div`
  display: block;
  position: relative;
  min-height: 100px;
  width: 100%;
  cursor: pointer;

  &.-reel {
    width: unset;
  }

  ${desktopAndUp(`
    min-height: 200px;
  `)}

  .slide__image-container {
    max-height: 280px;
    overflow: hidden;
    img {
      margin: 0 calc(${setSpace(1)} / 2);
    }
  }
`;
