import { useEffect, useRef } from 'react';

declare const window: any;

const SpriteSpinnerSFC = ({ shouldStartSpinner, bunnyBaseURL, spriteSource }) => {
  const spinnerEl = useRef(null);

  useEffect(() => {
    if (shouldStartSpinner) {
      startSpinner();
    }

    return () => stopSpinner();
  }, [shouldStartSpinner]);

  async function startSpinner() {
    console.log('starting spinner');
    if (spriteSource === 'bunny') {
      console.log('case 1');
      const SpriteSpin = window.SpriteSpin;

      if (typeof spinnerEl?.current?.spritespin === 'function') {
        console.log('case 2');
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
      const url = this.props.spriteImageUrl;

      if (typeof this.spinnerEl?.spritespin === 'function') {
        this.spinnerEl.spritespin({
          source: url,
          frames: 100,
          framesX: 6,
          responsive: true,
          retainAnimate: this.props?.retainAnimate || true,
          frameTime: 120,
          sense: -1,
          plugins: ['360', 'move'],
          onLoad: this.props.onSpriteLoad,

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
    <div
      onMouseEnter={() => playSpinner()}
      onMouseLeave={() => pauseSpinner()}
      // eslint-disable-next-line no-undef
      // @ts-expect-error - $ is a global
      ref={(spriteDivRef) => (spinnerEl.current = $(spriteDivRef))}
    />
  );
};

export default SpriteSpinnerSFC;
