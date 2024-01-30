import { tabletAndUp, setSpace, contentBlockMargin } from '@diamantaire/styles/darkside-styles';
import styled from 'styled-components';

interface Props {
  $titleFont: string;
  $titleStyle: string;
  $titleColor: string;
}

export const ModularVideoBlockStyles = styled.div<Props>`
  width: 100%;
  max-width: 144rem;
  ${contentBlockMargin}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${tabletAndUp(`
    padding: 0 ${setSpace(3)};
  `)};

  &.hearst,
  &.--full-width {
    padding: 0;
  }

  .video-block__icon-container {
    position: absolute;
  }
  .video-block__icon {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.5);
    height: ${setSpace(6)};
    width: ${setSpace(6)};
    border-radius: 50%;
    ${tabletAndUp(`
      height: ${setSpace(12)};
      width: ${setSpace(12)};
    `)};

    transition: opacity 0.33s ease;

    &.videoPlaying {
      opacity: 0;
    }

    svg {
      height: ${setSpace(3)};
      width: ${setSpace(3)};
      padding-left: ${setSpace(0.5)};
      ${tabletAndUp(`
        height: ${setSpace(6)};
        width: ${setSpace(6)};
        padding-left: ${setSpace(1)};
      `)};
    }
  }

  .video-block__title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 10%;
    font-family: ${(props) => (props.$titleFont ? props.$titleFont : 'var(--font-family-main)')};
    font-style: ${(props) => (props.$titleStyle ? props.$titleStyle : 'initial')};
    font-weight: 200;
    line-height: 1;
    font-size: 4rem;
    text-align: center;
    width: fit-content;
    margin: 0 auto;
    color: ${(props) => props?.$titleColor};

    ${tabletAndUp(`
      font-size: 6rem;
      top: 43%;
    `)}
  }

  .video-block__mobile-wrapper {
    width: 100%;
  }
`;
