import { setSpace, desktopAndUp, XXLDesktopAndUp, customBPAndUp } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

export const InstagramThumnailSlideContainer = styled.div`
  display: block;
  position: relative;
  cursor: pointer;

  &.-right-margin {
    margin-right: ${setSpace(1)};
  }
  &.-insta-swiper-carousel {
    width: 100%;
    height: auto;
  }
  &.-insta-carousel {
    height: 15vw;
    width: 15vw;

    ${desktopAndUp(`
      height: 17vw;
      width: 17vw;
    `)};

    ${XXLDesktopAndUp(`
      height: 25.6rem;
      width: 25.6rem;
    `)};

    ${customBPAndUp(
      '1750px',
      `
      height: 30rem;
      width: 30rem;
    `,
    )}
  }
`;
