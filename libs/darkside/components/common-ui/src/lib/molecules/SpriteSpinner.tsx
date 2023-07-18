import { useEffect, useRef } from 'react';
import styled from 'styled-components';

// import { SpriteSpinnerInit } from './SpriteSpinnerInit';

declare const window: any;

const SpritSpinnerContainer = styled.div`
  .spritespin-canvas {
    width: 100%;
    height: 100%;
  }
`;

interface SpriteSpinnerProps {
  shouldStartSpinner?: boolean;
  bunnyBaseURL: string;
  spriteSource?: string;
  onSpriteLoad?: () => void;
}

const SpriteSpinner = (props: SpriteSpinnerProps) => {
  const { shouldStartSpinner, bunnyBaseURL, spriteSource, onSpriteLoad } = props;
  const spinnerEl = useRef(null);

  useEffect(() => {
    if (shouldStartSpinner) {
      startSpinner();
    }

    return () => stopSpinner();
  }, [shouldStartSpinner]);

  async function startSpinner() {
    if (spriteSource === 'bunny') {
      const SpriteSpin = window.SpriteSpin;

      if (typeof spinnerEl?.current?.spritespin === 'function') {
        spinnerEl?.current?.spritespin({
          source: SpriteSpin.sourceArray(bunnyBaseURL + '/{lane}.{frame}.jpg', {
            lane: [0, 7],
            frame: [0, 19],
            digits: 4,
          }),

          lanes: 8,
          frames: 20,
          sense: -1.5,
          senselane: 1.25,
          lane: 7,
          frame: 0,
          animate: false,
          responsive: true,
          detectSubsampling: false,
          framesX: 6,
          frameTime: 360,
          retainAnimate: true,
          plugins: ['progress', '360', 'drag'],

          // Needed for CORS issue hack
          crossOrigin: 'anonymous',
        });
      }
    } else {
      const url = bunnyBaseURL;

      if (typeof spinnerEl?.current?.spritespin === 'function') {
        spinnerEl?.current.spritespin({
          source: url,
          frames: 100,
          framesX: 6,
          responsive: true,
          retainAnimate: false,
          frameTime: 120,
          sense: -1,
          plugins: ['360', 'move'],
          onLoad: onSpriteLoad,

          // Needed for CORS issue hack
          crossOrigin: 'anonymous',
        });
      }
    }
  }

  function playSpinner() {
    const api = spinnerEl.current.spritespin('api');

    if (api?.data?.animate !== true) {
      api.toggleAnimation();
    }
  }

  function pauseSpinner() {
    const api = spinnerEl.current.spritespin('api');

    if (api?.data?.animate === true) {
      api.toggleAnimation();
    }
  }

  function stopSpinner() {
    if (typeof spinnerEl.current?.spritespin === 'function') {
      spinnerEl?.current?.spritespin('destroy');
    }
  }

  return (
    <SpritSpinnerContainer>
      {/* <SpriteSpinnerInit /> */}

      <div
        onMouseEnter={() => playSpinner()}
        onMouseLeave={() => pauseSpinner()}
        // eslint-disable-next-line no-undef
        // @ts-expect-error - $ is a global
        ref={(spriteDivRef) => (spinnerEl.current = $ && $(spriteDivRef))}
      />
    </SpritSpinnerContainer>
  );
};

export default SpriteSpinner;

export { SpriteSpinner };
